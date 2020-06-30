const express = require('express');
const login_controller = require('../login.controller');

const router = express.Router();

router.post("/login", login_controller.login);

module.exports = router;