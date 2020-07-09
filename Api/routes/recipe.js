const express = require('express');
const recipe_controller = require('../recipe.controller');

const router = express.Router();

router.get("/recipes/list", recipe_controller.find);
router.post("/recipes/add", recipe_controller.create);
module.exports = router;