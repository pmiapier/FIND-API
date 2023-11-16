const {
  postItem,
  updateItem,
  deleteItem,
  renewItem,
  edituser,
  dashboard,
  getMyProduct,

  updateItemStatus
} = require('../controllers/user-controller');
const authenticate = require(`../middlewares/authenticate`);
const upload = require(`../middlewares/upload`);

const router = require(`express`).Router();

router.post(`/postItem`, authenticate, upload.any(`file`), postItem);
router.patch(`/updateItem`, authenticate, upload.any(`file`), updateItem);
router.patch(`/updateItemStatus`, authenticate, updateItemStatus);
router.delete(`/deleteItem`, authenticate, deleteItem);
router.patch(`/renew`, authenticate, renewItem);
router.get('/my-product', authenticate, getMyProduct);
router.patch(`/updateUser/:id`, authenticate, edituser);
router.get(`/dashboard`, authenticate, dashboard);

module.exports = router;
