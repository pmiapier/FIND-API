const prisma = require(`../models/prisma`);

const chatRooms = async (req, res) => {
    try {
        const namex = req.query.user
        const idx = await prisma.user.findFirst({
            where: {
                user: namex
            }
        })
        console.log('....................................', idx);

        const chatRooms = await prisma.chatroom.findMany({
            where: {
                OR: [{ userA_id: +idx.id }, { userB_id: +idx.id }]
            },
            select: {
                userA: true,
                userB: true,
            }
        });
        // console.log(chatRooms);
        res.json(chatRooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching chat rooms' });
    }
};

module.exports = { chatRooms };