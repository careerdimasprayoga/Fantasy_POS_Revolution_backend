const router = require("express").Router();
const {
  getAllProduct,
  searchProduct,
  getProductOrderName,
  getProductOrderCategory,
  getProductOrderDate,
  getProductOrderPrice,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getTotalProducts,
  sortProduct,
} = require("../controller/product");
const { auth, management_page } = require("../middleware/auth");
const {
  getProductRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const uploadImage = require("../middleware/multer");

router.get("/", auth, getProductRedis, getAllProduct);
router.get("/gettotalproducts", getTotalProducts);
router.get("/search", auth, searchProduct);
router.get("/sort", auth, sortProduct);
router.get("/ordername", auth, getProductOrderName);
router.get("/ordercategory", auth, getProductOrderCategory);
router.get("/orderdate", auth, getProductOrderDate);
router.get("/orderprice", auth, getProductOrderPrice);
router.get("/:id", auth, getProductById);
router.post(
  "/",
  management_page,
  uploadImage,
  clearDataProductRedis,
  postProduct
);
router.patch(
  "/:id",
  management_page,
  uploadImage,
  clearDataProductRedis,
  patchProduct
);
router.delete("/:id", management_page, clearDataProductRedis, deleteProduct);

module.exports = router;
