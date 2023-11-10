const { createRent, verifyPayment } = require("../controllers/rent-controller")
const authenticate = require("../middlewares/authenticate")
const {orderTemplate} = require('../middlewares/emailNotificationTemplate')

const router = require(`express`).Router()


router.post(`/createRent`,authenticate,createRent)
router.post('/verifyPayment', authenticate, verifyPayment,orderTemplate)






module.exports = router