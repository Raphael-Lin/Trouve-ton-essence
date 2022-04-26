// mongodb+srv://carbu:<password>@cluster0.bkhro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// importer mongoose pour se connecter a la bdd de mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://carbu:FightClub2310@cluster0.bkhro.mongodb.net/carbudb?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connexion réussie à mongoDB"))
.catch(() => console.log("Connexion échouée"));

module.exports = mongoose;