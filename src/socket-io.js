module.exports = (io) => {
    const { PrismaClient } = require(`@prisma/client`);
    const prisma = new PrismaClient()
    const onlineUser = {}
    io.on('connection', socket => {
        const authUser = socket.handshake.auth.authUser;
        // console.log(socket.handshake.auth.authUser)
        if (authUser && authUser.firstName) {
            // onlineUser[authUser] = {
            //     socketId: socket.id,
            //     firstName: authUser.firstName
            // };
            const userId = authUser.id;
            const firstName = authUser.firstName;

            onlineUser[+userId] = {
                socketId: socket.id,
                userId: userId,
                firstName: firstName
            };

            io.emit("onlineUser", onlineUser)
            // io.emit("onlineUser", Object.values(onlineUser))

            // console.log(`${socket.id} Connect`);
            // console.log(`onlineUser : `, onlineUser);
            // console.log(onlineUser);
        } else {
            // กรณีที่ authUser เป็นค่า null หรือไม่มี firstName
            console.error('authUser is null or does not contain firstName');
        }

        //####### disconnect #######
        socket.on(`disconnect`, () => {
            delete onlineUser[authUser]
            // Emit the updated list of online users to all clients
            io.emit("onlineUser", onlineUser);
            // io.emit("onlineUser", Object.values(onlineUser))
            // console.log(`${socket.id} Disconnect`);
            // console.log(`onlineuser : `, onlineUser);
        })

        //####### join room #######
        socket.on(`join_room`, async data => {
            // const arr = []
            // arr.push(data.sender)
            // arr.push(data.receiver)
            // arr.sort()
            // console.log(data, "+++++++++ data ++++++++++");
            // const sender = await prisma.user.findFirst({ where: { id: arr[0] } })
            // const receiver = await prisma.user.findFirst({ where: { id: arr[1] } })
            // console.log(sender.id, "sender");
            // console.log(receiver.id, "receiver");
            // let room = await prisma.chatroom.findFirst({
            //     where: {
            //         AND: [{ userA_id: sender.id }, { userB_id: receiver.id }]
            //     }
            // })
            // if (!room) {
            //     room = await prisma.chatroom.create({
            //         data: {
            //             userA_id: sender.id,
            //             userB_id: receiver.id
            //         }
            //     })
            // }
            //#################################################
            const senderId = parseInt(data.sender);  // Parse sender ID to integer
            console.log(senderId, "testa")
            const receiverId = parseInt(data.receiver);  // Parse receiver ID to integer
            console.log(data.receiver, "dataBBBB")
            console.log(receiverId, "testb")
            const sortedUserIds = [senderId, receiverId].sort();
            console.log(data, "+++++++++ data ++++++++++");
            const sender = await prisma.user.findFirst({ where: { id: senderId } })
            const receiver = await prisma.user.findFirst({ where: { id: receiverId } })

            console.log(senderId, "sender");
            console.log(receiverId, "receiver");

            // Adjust the creation of the room based on IDs
            let room = await prisma.chatroom.findFirst({
                where: {
                    OR: [
                        { userA_id: senderId }, { userB_id: receiverId },
                        { userA_id: receiverId }, { userB_id: senderId }
                    ]
                }
            })

            if (!room) {
                room = await prisma.chatroom.create({
                    data: {
                        userA_id: senderId,
                        userB_id: receiverId
                    }
                })
            }
            //#################################################
            const allChat = await prisma.message.findMany({
                where: {
                    chatroom_id: room.id
                },
                include: {
                    sender: true
                }
            })

            socket.join(room.id)
            // console.log(room.id, "join")

            io.to(room.id).emit(`room_id`, { id: room.id })
            io.to(room.id).emit(`all_chat`, { allChat })
            io.emit("updateChatRoom")

        })

        //####### send message #######
        socket.on(`send_message`, async (data) => {
            const { chatroom, sender, message, type } = data
            const senderId = await prisma.user.findFirst({ where: { id: sender } })
            await prisma.message.create({
                data: {
                    chatroom_id: chatroom,
                    sender_id: senderId.id,
                    message: message,
                    send_date: new Date(),
                    type
                }
            })
            // console.log("send_message from :", socket.id, "to:", onlineUser[+data.to]);
            io.to(onlineUser[+data.to].socketId).emit(`receive_message`, data)
        })
    })
}