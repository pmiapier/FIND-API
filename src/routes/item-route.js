const { getAllItem, getSingleItem } = require("../controllers/item-controller")

const router = require(`express`).Router()




router.get(`/`,getAllItem)
router.post(`/get-single-item`,getSingleItem)




module.exports = router