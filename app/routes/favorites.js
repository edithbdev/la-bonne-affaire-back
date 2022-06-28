const express = require("express");
const favoritesController = require("../controllers/favoritesController");
const router = express.Router();

router.get("/", favoritesController.getAllFavorites);
router.post("/", favoritesController.addToFavorite);

module.exports = router;
