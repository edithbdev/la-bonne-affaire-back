const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dataMapper = require("../dataMapper/dataMapperUsers");

const authController = {
    login: (req, res, next) => {

        // check email + password
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('mauvais identifiants');
        }

        // check presence de l'email en BDD // check si l'user existe.
         dataMapper.getUserByEmail(email, (err, user) => {
            if (err) {
                return next(err);
            }

            if (user.length === 0) {
                return res.status(404).send("mauvais identifiants");
            }

            // check exactitude des mots de passe
            const userPasswordInBdd = user[0].password;
            // pour comparer le mot de passe saisi avec celui de la bdd
            const isSamePassword = bcrypt.compareSync(
                password,
                userPasswordInBdd
            )

            if (!isSamePassword) {
                return res.status(400).send('mauvais identifiants');
            }

            // oui je peux créer le token et le renvoyer.
            jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    return next(err);
                }
                res.json({ token });
            }
            );
        });
    },

    authorization: (req, res, next) => {
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, results) => {
          if (err) {
            return next(err);
          }

          const userData = results.user[0];
          const { password, ...authData } = userData;

          res.json({ authData });
        });
      },
    };

    module.exports = authController;
