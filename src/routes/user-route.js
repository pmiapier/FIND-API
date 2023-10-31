const { postItem, updateItem } = require("../controllers/user-controller")
const authenticate = require(`../middlewares/authenticate`)
const upload = require(`../middlewares/upload`)

const router = require(`express`).Router()



router.post(`/postItem`,authenticate,upload.any(`file`),postItem)
router.patch(`/updateItem`,authenticate,upload.any(`file`),updateItem)




module.exports = router