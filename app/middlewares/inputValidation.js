const { check } = require("express-validator");
// https://stackoverflow.com/questions/64319368/express-validator-how-to-make-a-field-required-only-when-another-field-is-presen

const inputValidationMiddleware = [
    check("email").isEmail().withMessage("L'email n'est pas valide"),
    check("password").isLength({ min: 5 }).withMessage("Le mot de passe doit contenir au moins 5 caractères"),
    check("firstname").isLength({ min: 2 }).withMessage("Le prénom doit contenir au moins 2 caractères"),
    check("lastname").notEmpty().withMessage("Le nom doit être renseigné"),
    check("phone").optional().isInt().withMessage("Le numéro de téléphone doit être un nombre"),
];

module.exports = inputValidationMiddleware;
