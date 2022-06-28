const express = require("express");
const categories = require("./categories");
const favorites = require("./favorites");
const offers = require("./offers");
const users = require("./users");
const auth = require("./auth");
const router = express.Router();

router.use("/categories", categories);
router.use("/offers", offers);
router.use("/favorites", favorites);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
