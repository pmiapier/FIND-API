const prisma = require(`../models/prisma`)



const getAllItem = async (req,res,next)=>{
    console.log(`ok`);
    try {
        const data = await prisma.item.findMany()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const getSingleItem = async (req,res,next)=>{
    try {
        const id = req.body.id
        // we want to join the owner user data
        const data = await prisma.item.findUnique({
            where:{id:+id}
        })
        const user = await prisma.user.findUnique({
            where:{id:data.ownerId}
        })

        data.user = user.firstName + " " + user.lastName.slice(0,1);
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}





module.exports ={getAllItem, getSingleItem}