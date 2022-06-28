const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/login", authController.login);
router.post("/", verifyToken, authController.authorization);

module.exports = router;
