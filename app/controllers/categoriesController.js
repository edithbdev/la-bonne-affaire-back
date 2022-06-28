const dataMapper = require("../dataMapper/dataMapperCategories");

const categoriesController = {
  getAllCategories: (req, res, next) => {
    dataMapper.getAllCategories((err, results) => {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
  },

  getOneCategory: (req, res, next) => {
    const { categoryId } = req.params;
    dataMapper.getCategoryById(categoryId, (err, results) => {
      if (err) {
        console.log("JE SUIS DANS LERREUR");
        return next(err);
      }

      if (results.length === 0) {
        return res.send("La catégorie n'a pas pu être trouvée");
      }
      res.json(results[0]);
    });
  },
};

module.exports = categoriesController;
