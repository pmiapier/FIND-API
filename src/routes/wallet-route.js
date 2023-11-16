const { withdraw,getWallet } = require("../controllers/wallet-controller")
const authenticate = require("../middlewares/authenticate")
const {withdrawTemplate} = require("../middlewares/emailNotificationTemplate")

const router = require(`express`).Router()


router.patch(`/withdraw`,authenticate,withdraw,withdrawTemplate)
router.get(`/getWallet`,authenticate,getWallet)






module.exports = router