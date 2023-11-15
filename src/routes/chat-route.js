const { chatRooms } = require("../controllers/chat-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()

router.get(``, authenticate, chatRooms);


module.exports = router