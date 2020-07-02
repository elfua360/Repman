const express = require('express');
const user_controller = require('../user.controller');
const router = express.Router();

/* GET users listing. */
router.get("/users", user_controller.find);

module.exports = router;
