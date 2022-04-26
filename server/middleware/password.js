// importation de password validator
const passwordValidator = require('password-validator');

// création du schéma
const passwordSchema = new passwordValidator();

// les propri que dois respecter le schéma
passwordSchema
.is().min(8)                                    // Minimum 8 caractère
.is().max(100)                                  // Macimum 100 caractère
.has().uppercase()                              // doit contenir maj
.has().lowercase()                              // doit contenir min
.has().digits(2)                                // doit contenir au mois 2 chiffres
.has().not().spaces()                           // ne dois pas contenir d'espace


// verification de la qualité du password par rapport au schéma 
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res
        .status(400)
        .json({error : "Le mdp ne contient pas" + " " +passwordSchema.validate('req.body.password', { list: true })})
    }
}