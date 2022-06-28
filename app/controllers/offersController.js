const dataMapper = require("../dataMapper/dataMapperOffers");

const offersController = {
  getAllOffers: (req, res, next) => {
    dataMapper.getAllOffers((err, results) => {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
  },

  getOneOffer: (req, res, next) => {
    const { offerId } = req.params;
    dataMapper.getOfferById(offerId, (err, offer) => {
      if (err) {
        console.log("JE SUIS DANS LERREUR");
        return next(err);
      }

      if (offer.length === 0) {
        return res.send("L'annonce n'a pas pu être trouvée");
      }
      res.json(offer[0]);
    });
  },

  createOffer: (req, res, next) => {
    const offerData = req.body;
    dataMapper.postOffer(offerData, (err, results) => {
      if (err) {
        return next(err);
      }

      dataMapper.getOfferById(results.insertId, (err, results) => {
        if (err) {
          return next(err);
        }

        res.json(results[0]);
      });
    });
  },

  updateOffer: (req, res, next) => {
    const { offerId } = req.params;
    const updateOfferData = req.body;

    dataMapper.getOfferById(offerId, (err, offer) => {
      if (err) {
        return next(err);
      }

      if (offer.length === 0) {
        return res.send("L'annonce n'a pas pu être trouvée");
      }

      dataMapper.updateOffer(updateOfferData, offerId, (err, results) => {
        if (err) {
          return next(err);
        }

        dataMapper.getOfferById(offerId, (err, offer) => {
          if (err) {
            return next(err);
          }

          res.json(offer[0]);
        });
      });
    });
  },

  deleteOffer:  (req, res, next) => {
    const { offerId } = req.params;
      dataMapper.deleteOffer(offerId, (err, results) => {
        if (err) {
          return next(err);
        }

         if (results.affectedRows === 0) {
          return res
            .status(422) // https://developer.mozilla.org/fr/docs/Web/HTTP/Status/422
            .send(`L'offre ${offerId} n'a pas pu être supprimée`);
        }

          // res.status(200).json({ status: "deleted"})
          res.status(200).send("l'offre a été supprimée");
        });
      },
  };

module.exports = offersController;
