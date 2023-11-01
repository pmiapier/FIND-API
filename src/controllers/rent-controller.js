const prisma = require(`../models/prisma`)




const createRent = async (req,res,next)=>{
    try {
        const {itemId,startRentDate,endRentDate} = req.body
        const item = await prisma.item.findFirst({
            where:{id:+itemId},
            select:{ownerId:true,price:true}
        })
        console.log(typeof item.ownerId);

        const rentTime = Math.floor((new Date(endRentDate) - new Date(startRentDate))/(1000*60*60*24))
        const rent = await prisma.rent.create({
            data:{
                status:"inprocess",
                amount:item.price*rentTime,
                deposit:item.price*rentTime*0.3,
                createdAt:new Date(),
                startRentDate:new Date(startRentDate),
                endRentDate:new Date(endRentDate),
                ownerId:item.ownerId,
                renteeId:req.user.id,
                itemId:+itemId
            }
        })


        res.status(200).json(rent)
    } catch (error) {
        next(error)
    }
}



module.exports ={createRent}