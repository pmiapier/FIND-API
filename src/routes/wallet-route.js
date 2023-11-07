const { withdraw,getWallet } = require("../controllers/wallet-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.patch(`/withdraw`,authenticate,withdraw)
router.get(`/getWallet`,authenticate,getWallet)






module.exports = router