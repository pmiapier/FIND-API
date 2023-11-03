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




module.exports ={getAllItem}