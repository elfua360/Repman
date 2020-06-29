import Login_controller from "../login.controller"

const express = require('express');
const router = express.Router();

router.post("/login", Login_controller.login);

module.exports = router;