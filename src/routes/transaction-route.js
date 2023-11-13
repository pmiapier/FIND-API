const { createTransaction,getTransaction } = require("../controllers/transaction-controller")


const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.post(`/createTransaction`,authenticate,createTransaction)
router.get(`/get-order`,authenticate,getTransaction)
// router.get(`/get-point`,authenticate,getPoint)






module.exports = router