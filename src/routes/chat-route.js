const { chatRooms } = require("../controllers/chat-controller")
const authenticate = require("../middlewares/authenticate")

const router = require(`express`).Router()

router.get(`/chat`, authenticate, chatRooms);

module.exports = router