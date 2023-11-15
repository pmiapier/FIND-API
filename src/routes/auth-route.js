const { register, login, me, resetPassword } = require('../controllers/auth-controller');
const authenticate = require(`../middlewares/authenticate`);

const router = require(`express`).Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.get(`/me`, authenticate, me);
router.patch('/reset-password', authenticate, resetPassword);

module.exports = router;
