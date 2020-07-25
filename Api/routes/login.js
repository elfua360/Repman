const express = require('express');
const login_controller = require('../login.controller');

const router = express.Router();

router.post("/login", login_controller.login);
//router.get("/logout", login_controller.logout);
router.post("/authcheck", login_controller.authCheck);

module.exports = router;