const { getAllItem } = require("../controllers/item-controller")

const router = require(`express`).Router()




router.get(`/`,getAllItem)




module.exports = router