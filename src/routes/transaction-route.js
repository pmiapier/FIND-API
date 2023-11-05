const { createTransaction } = require("../controllers/transaction-controller")


const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.post(`/createTransaction`,authenticate,createTransaction)






module.exports = router