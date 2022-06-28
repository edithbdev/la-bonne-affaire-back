const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const dataMapper = require("../dataMapper/dataMapperUsers");

const usersController = {
  getAllUsers: (req, res, next) => {
    dataMapper.getAllUsers((err, users) => {
      if (err) {
        return next(err);
      }
      users.forEach((user) => delete user.password);

      res.json(users);
    });
  },

  getOneUser: (req, res, next) => {
    const { userId } = req.params;

    dataMapper.getOneUser(userId, (err, user) => {
      if (err) {
        return next(err);
      }

      if (user.length === 0) {
        return res.send("L'utilisateur n'a pas pu être trouvé");
      }

      delete user[0].password;

      res.json(user[0]);
    });
  },

  getUsersFavorite: (req, res, next) => {
    const { userId } = req.params;

    dataMapper.getUsersFavorite(userId, (err, userFavorite) => {
      if (err) {
        return next(err);
      }

      if (userFavorite.length === 0) {
        return res.send("Vous n'avez pas encore ajouté de favoris");
      }

      res.json(userFavorite);
    });
  },

  getUsersOffer: (req, res, next) => {
    const { userId } = req.params;
    dataMapper.getUsersOffers(userId, (err, userOffer) => {
      if (err) {
        return next(err);
      }
      if (userOffer.length === 0) {
        return res.send("Vous n'avez pas encore ajouté d'offres");
      }
      res.json(userOffer);
    });
  },

  // https://express-validator.github.io/docs/
  createUser: (req, res, next) => {
    const userData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    dataMapper.getUserByEmail(userData.email, (err, user) => {
      if (err) {
        return next(err);
      }

      if (user[0] !== undefined) {
        return res.status(400).send(`Cet email ${userData.email} existe deja`);
      }

      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      userData.password = hashedPassword;

      dataMapper.postUser(userData, (err, user) => {
        if (err) {
          return next(err);
        }

        dataMapper.getOneUser(user.insertId, (err, user) => {
          if (err) {
            return next(err);
          }

          const insertedUser = user[0];
          const { password, ...newUser } = insertedUser;
          console.log(password, "PASSWORD");
          res.json(newUser);

        })
      })
    });
  },
};

module.exports = usersController;
