module.exports = (io) => {
    const { PrismaClient } = require(`@prisma/client`);
    const prisma = new PrismaClient()
    const onlineUser = {}
    io.on('connection', socket => {
        const authUser = socket.handshake.auth.authUser;
        // console.log(socket.handshake.auth.authUser)
        if (authUser && authUser.firstName) {
            const userId = authUser.id;
            const firstName = authUser.firstName;
            const lastName = authUser.lastName;
            const fullName = authUser.firstName + " " + authUser.lastName;
            onlineUser[+userId] = {
                socketId: socket.id,
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                fullName: fullName
            };
            io.emit("onlineUser", onlineUser)
            // io.emit("onlineUser", Object.values(onlineUser))
            // console.log(`${socket.id} Connect`);
            // console.log(`onlineUser : `, Object.keys(onlineUser));
        } else {
            // กรณีที่ authUser เป็นค่า null หรือไม่มี firstName
            // console.error('authUser is null or does not contain firstName');
        }
        //####### disconnect #######
        socket.on(`disconnect`, () => {
            // console.log(authUser)
            if (authUser) {
                delete onlineUser[authUser.id]
                io.emit("onlineUser", onlineUser);
            }
            // console.log(`${socket.id} Disconnect`);
            // console.log(`onlineuser : `, Object.keys(onlineUser));
        })
        //####### join room #######
        socket.on(`join_room`, async data => {
            // console.log(data, "+++++++++ data ++++++++++");
            const senderId = data.sender;
            // console.log(senderId, "sender")
            const receiverId = data.receiver;
            // console.log(receiverId, "receiver")
            const sortedUserIds = [senderId, receiverId].sort();
            const sender = await prisma.user.findFirst({ where: { id: senderId } })
            const receiver = await prisma.user.findFirst({ where: { id: receiverId } })
            let room = await prisma.chatroom.findFirst({
                where: {
                    OR: [
                        { AND: { userA_id: sender.id, userB_id: receiver.id } },
                        { AND: { userA_id: receiver.id, userB_id: sender.id } }
                    ]
                }
            })
            // console.log("R", room)
            if (!room) {
                room = await prisma.chatroom.create({
                    data: {
                        userA_id: senderId,
                        userB_id: receiverId
                    }
                })
            }
            const allChat = await prisma.message.findMany({
                where: {
                    chatroom_id: room.id
                },
                include: {
                    sender: true
                }
            })
            // console.log("room :", room.id)
            socket.join(room.id)
            io.to(room.id).emit(`room_id`, { id: room.id })
            io.to(room.id).emit(`all_chat`, { allChat })
            io.emit("updateChatRoom")

        })
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
            // console.log("send_message from :", authUser.id, "to:", onlineUser[+data.to].userId);
            io.to(onlineUser[data.to]?.socketId).emit(`receive_message`, data)

        })
    })
}