const express = require('express');
const recipe_controller = require('../recipe.controller');

const router = express.Router();

router.get("/recipes/list", recipe_controller.find);
router.post("/recipes/add", recipe_controller.create);
router.delete("/recipes/delete", recipe_controller.delete);
router.put("/recipes/update", recipe_controller.update);
module.exports = router;