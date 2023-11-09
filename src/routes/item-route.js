const {
  getAllItem,
  getSingleItem,
  getCategories,
  myRentalItem,
  myRentedItem
} = require('../controllers/item-controller');
const authenticate = require('../middlewares/authenticate');

const router = require(`express`).Router();

router.get(`/`, getAllItem);
router.get(`/get-single-item/:id`, getSingleItem);
router.get(`/getCategories`, getCategories);

router.get(`/myRentalItem`, authenticate, myRentalItem);
router.get(`/myRentedItem`, authenticate, myRentedItem);

module.exports = router;
