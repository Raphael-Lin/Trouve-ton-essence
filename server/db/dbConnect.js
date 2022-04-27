// mongodb+srv://carbu:<password>@cluster0.bkhro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// importer le package pour utiliser les variables d'environnement 
const dotenv = require("dotenv");
const result = dotenv.config();

// importer mongoose pour se connecter a la bdd de mongoDB
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connexion réussie à mongoDB"))
.catch(() => console.log("Connexion échouée"));

module.exports = mongoose;