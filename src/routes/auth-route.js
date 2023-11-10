const { register, login, me } = require("../controllers/auth-controller");
const {registerTemplate} = require("../middlewares/emailNotificationTemplate")
const authenticate = require(`../middlewares/authenticate`);


const router = require(`express`).Router();





router.post(`/register`, register,registerTemplate);
router.post(`/login`, login);
router.get(`/me`, authenticate, me);




module.exports = router;
