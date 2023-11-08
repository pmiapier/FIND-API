const { createTransaction,getTransaction } = require("../controllers/transaction-controller")


const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.post(`/createTransaction`,authenticate,createTransaction)
router.get(`/get-order`,authenticate,getTransaction)






module.exports = router