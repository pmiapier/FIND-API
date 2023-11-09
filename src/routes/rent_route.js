const { createRent, verifyPayment } = require("../controllers/rent-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.post(`/createRent`,authenticate,createRent)
router.post('/verifyPayment', authenticate, verifyPayment)






module.exports = router