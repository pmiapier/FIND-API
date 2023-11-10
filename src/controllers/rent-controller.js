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


const createRental = async (rental) => {
    try {
        const rent = await prisma.rent.create({
            data: {
                ownerId: rental.ownerId,
                renteeId: rental.renteeId,
                itemId: rental.itemId,
                startRentDate: rental.startRentDate, 
                endRentDate: rental.endRentDate,
                status: rental.status,
                amount: rental.amount,
                deposit: rental.deposit,
                stripeSession: rental.stripeSession,
            }
        })
        return true
    } catch (error) {
        console.log('Error storing rental', error)
        return false
    }
}

const verifyPayment = async (req, res, next) => {
    const {sessionId, success} = req.body
    if(sessionId && success === true) {
        try {
            const updatePayment = await prisma.rent.update({
                where: { stripeSession: sessionId, status: "awaiting_payment", renteeId: req.user.id},
                data: {
                    status: "inprocess",
                }
            })
            next()
         } catch (error) {
            next(error)
         }
    } else {
        res.status(500)
    }
}


module.exports ={createRent, createRental, verifyPayment}