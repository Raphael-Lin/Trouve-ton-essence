//importation de mongoose 
const mongoose = require("mongoose");

// le modèle de base de donnée pour le singup
// pour enregistrer un nouvel utilisateur 

const userSchema = mongoose.Schema({
    email: { type: String, required:true, unique:true},
    password : {type: String, required: true}
});

// exportation du module
module.exports = mongoose.model("user", userSchema);