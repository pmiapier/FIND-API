const { updateWallet } = require("../controllers/wallet-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.patch(`/updateWallet`,authenticate,updateWallet)






module.exports = router