const express = require("express");
const offersController = require("../controllers/offersController");
const router = express.Router();

router.get("/", offersController.getAllOffers);
router.get("/:offerId", offersController.getOneOffer);
router.post("/", offersController.createOffer);
router.put("/:offerId", offersController.updateOffer);
router.delete("/:offerId", offersController.deleteOffer);

module.exports = router;
