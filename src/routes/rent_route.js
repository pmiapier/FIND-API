const { verifyPayment, changeOwnerStatus, changeRenteeStatus } = require("../controllers/rent-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()

router.post('/verifyPayment', authenticate, verifyPayment)
router.post('/changeOwnerStatus', authenticate, changeOwnerStatus)
router.post('/changeRenteeStatus', authenticate, changeRenteeStatus)

module.exports = router