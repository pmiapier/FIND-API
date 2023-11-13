const prisma = require(`../models/prisma`)


const createRental = async (rental) => {
    try {
        const rent = await prisma.rent.create({
            data: {
                ownerId: rental.ownerId,
                renteeId: rental.renteeId,
                itemId: rental.itemId,
                startRentDate: rental.startRentDate,
                endRentDate: rental.endRentDate,
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
                where: { stripeSession: sessionId, rentee_status: "awaiting_payment", renteeId: req.user.id},
                data: {
                    rentee_status: "pending_received",
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

const changeOwnerStatus = async (req, res, next) => {
    try {
        const {rentId, status} = req.body
        const updateStatus = await prisma.rent.update({
            where: { id: rentId, ownerId: req.user.id },
            data: {
                owner_status: status,
            }
        })
        res.status(200).json(updateStatus)
    } catch (error) {
        next(error)
    }
}

const changeRenteeStatus = async (req, res, next) => {
    try {
        const {rentId, status} = req.body
        const updateStatus = await prisma.rent.update({
            where: { id: rentId, renteeId: req.user.id },
            data: {
                rentee_status: status,
            }
        })
        res.status(200).json(updateStatus)
    } catch (error) {
        next(error)
    }
}


module.exports ={createRental, verifyPayment, changeOwnerStatus, changeRenteeStatus}