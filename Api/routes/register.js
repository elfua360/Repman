const express = require('express');
const register_controller = require('../register.controller');

const router = express.Router();

router.post("/register", register_controller.create);
//router.get("/users", register_controller.find);
//router.get("/user/:id", register_controller.findOne);

module.exports = router;