const express = require("express");
const usersController = require("../controllers/usersController");
const inputValidationMiddleware = require("../middlewares/inputValidation");
const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/:userId", usersController.getOneUser);
router.post("/", inputValidationMiddleware, usersController.createUser);
router.get("/:userId/favorite", usersController.getUsersFavorite);
router.get("/:userId/offers", usersController.getUsersOffer);

module.exports = router;
