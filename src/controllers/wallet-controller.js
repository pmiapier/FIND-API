const prisma = require(`../models/prisma`)
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()

const updateWallet = async(req,res,next) => {
    try {
        const FindAmountOld = await prisma.transaction.findFirst({

        })
    } catch (error) {
        console.log(error)
    }
}






module.exports ={updateWallet}