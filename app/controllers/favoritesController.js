// connexion À la bdd
const dataMapper = require("../dataMapper/dataMapperFavorites");

const favoritesController = {
  getAllFavorites: (req, res, next) => {
    dataMapper.getAllFavorites((err, favorites) => {
      if (err) {
        return next(err);
      }
      res.json(favorites);
    });
  },

  addToFavorite: (req, res, next) => {
    const favoriteData = req.body;

    dataMapper.postFavorite(favoriteData, (err, results) => {
      if (err) {
        return next(err);
      }

      console.log(results, "RESULTS");

      res.send(`Annonce ${req.body.annonces_id} ajoutée aux favoris`);
    });
  },
};

module.exports = favoritesController;
