const { createRent } = require("../controllers/rent-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()


router.post(`/createRent`,authenticate,createRent)






module.exports = router