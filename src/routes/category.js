const router = require("express").Router()
const { getCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')
const { getCategoryRedis, clearDataCategoryRedis } = require('../middleware/redis')
const { management_page } = require('../middleware/auth')

router.get("/", getCategoryRedis, getCategory);
router.get("/:id", getCategoryById);
router.post("/", management_page, clearDataCategoryRedis, postCategory);
router.patch("/:id", management_page, clearDataCategoryRedis, patchCategory);
router.delete("/:id", management_page, clearDataCategoryRedis, deleteCategory);

module.exports = router