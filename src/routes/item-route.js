const {
  getAllItem,
  getSingleItem,
  getCategories,
  myRentalItem,
  myRentedItem,
  productListing
} = require('../controllers/item-controller');
const authenticate = require('../middlewares/authenticate');
const authenticateCheckUser = require(`../middlewares/authenticateCheckUser`);

const router = require(`express`).Router();

router.get(`/`, getAllItem);
router.get(`/get-single-item/:id`, getSingleItem);
router.get(`/getCategories`, getCategories);

router.get(`/myRentalItem`, authenticate, myRentalItem);
router.get(`/myRentedItem`, authenticate, myRentedItem);

router.get(`/`, getAllItem);
router.post(`/get-single-item`, getSingleItem);
router.get(`/getCategories`, getCategories);

router.get(`/myRentalItem`, authenticate, myRentalItem);
router.get(`/myRentedItem`, authenticate, myRentedItem);
router.get(`/productListing`, authenticateCheckUser, productListing);

module.exports = router;
