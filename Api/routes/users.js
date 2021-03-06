const express = require('express');
const user_controller = require('../user.controller');
const router = express.Router();

/* GET users listing. */
router.get("/users", user_controller.find);
router.get("/delete/:id", user_controller.deleteOne);
router.get("/resend/:id", user_controller.resendVerification);
router.post("/resetpassword", user_controller.resetPassword);
router.post("/changepassword", user_controller.changePassword)

module.exports = router;
