const { getAllItem, getSingleItem,getCategories } = require("../controllers/item-controller")

const router = require(`express`).Router()




router.get(`/`,getAllItem)
router.post(`/get-single-item`,getSingleItem)
router.get(`/getCategories`,getCategories)



module.exports = router