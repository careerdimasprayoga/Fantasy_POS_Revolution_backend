const router = require("express").Router()
const { user_get, user_get_id, user_edit } = require('../controller/management');
const { management_page } = require('../middleware/auth')

router.get("/", management_page, user_get);
router.get("/:id", management_page, user_get_id);
router.patch("/:id", management_page, user_edit);

module.exports = router