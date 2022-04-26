//importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");

// Recupere le fichier zip
const axios = require("axios");
// Dezip le fichier pour obtenir le xml
const AdmZip = require("adm-zip");
// Convertis le fichier xml en objet JSON
const convert = require("xml-js");
// Acceder au file system
const fs = require("fs");
// Pour acceder aux pages
const path = require("path");
// Framework
const express = require("express");
// Handlebars pour faire des templates
var exphbs = require("express-handlebars");
// CORS permet d'eviter les erreurs de policy
const cors = require("cors");
// body-parser permet de parcourir le body de req dans les methodes post
const bodyParser = require('body-parser');
//importation de morgan(logger http)
const morgan = require("morgan");
// importation de connexion de bd
const mongoose = require("./server/db/dbConnect.js");
// importation des routes
const userRoutes = require("./server/path/pathUser.js" );
// const carbuRoutes = require("./server/carbu/processCarbuData.js");
const res = require("express/lib/response");

// application
const app = express();
app.use(cors());
// l'application utilise body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("lancement");

// view engine
var hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/public/layouts/",
});
app.engine("hbs", hbs.engine);

app.set("views", path.join(__dirname, "/public/views/"));
app.set("view engine", "hbs");

// Set paths to static files
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/server"));

// logger les  requests et les responses 
app.use(morgan("dev"));

// gérer les pblms de CORS
//(Cross-Origin-Request-Sharing)
//quand on a le front-end sur un serveur
// et le back-end sur un autre
app.use((req,res,next) => {
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader(
    "Access-Constrol-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-Type, Authorization"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
);
next();
});

//tranformer le body en json utilisable
app.use(bodyParser.json());

//la route d'authentification
app.use("/", userRoutes);
// app.use("/", carbuRoutes);

// Startup page for the server
app.get("/", function (req, res) {
  res.render("index", { title: "Trouve ton essence !" });
});

// get index.hbs
app.get("/index", function (req, res) {
  res.render("index", { title: "Trouve ton essence !" });
});

// get login.hbs
app.get("/login", function (req, res) {
  res.render("login", { title: "Trouve ton essence !" });
});

// get register.hbs
app.get("/register", function (req, res) {
  res.render("register", { title: "Trouve ton essence !"});
});

// get contacts.hbs
app.get("/contacts", function (req, res) {
  res.render("contacts", { title: "Trouve ton essence !" });
});

// post request index.hbs
app.post("/index", function (req, res) {
  var string_properties = '{"' + 'title' + '"' + ': ' + '"' + 'Trouve ton essence !' + '", ';
  if (req.body.Gazole) {
    string_properties += '"' + 'Gazole' + '"' + ': ' + '"' + 'true' + '", ';
  }
  if (req.body.SP95) {
    string_properties += '"' + 'SP95' + '"' + ': ' + '"' + 'true' + '", ';
  }
  if (req.body.SP98) {
    string_properties += '"' + 'SP98' + '"' + ': ' + '"' + 'true' + '", ';
  }
  if (req.body.E85) {
    string_properties += '"' + 'E85' + '"' + ': ' + '"' + 'true' + '", ';
  }
  if (req.body.E10) {
    string_properties += '"' + 'E10' + '"' + ': ' + '"' + 'true' + '", ';
  }
  if (req.body.GPL) {
    string_properties += '"' + 'GPL' + '"' + ': ' + '"' + 'true' + '", ';
  }
  var good_string = string_properties.slice(0, -2) + '}';
  console.log(good_string);
  res.render("index", JSON.parse(good_string));
});

// Set port of app
app.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.log(`error`);
    process.exit(1);
  }
  //console.log("adresse écouté: " + process.env.IP);
  console.log("port: " + process.env.PORT);
});

// gather the Data and make it a JSON
const getData = async () => {
  const url = "https://donnees.roulez-eco.fr/opendata/instantane";
  // recupere le fichier depuis l'url
  const body = await axios.get(url, {
    responseType: "arraybuffer",
  });

  // regarder les fichiers dans le zip
  var zip = new AdmZip(body.data);
  var zipEntries = zip.getEntries();

  // latin1 correspond a ISO-8859-1
  var Xmldata = zipEntries[0].getData().toString("latin1");

  // conversion du xml en json
  var JSONData = convert.xml2js(Xmldata, { compact: true, spaces: 4 });
  // conversion du json en string
  var JSONDatastring = JSON.stringify(JSONData, undefined, 4);

  // convertit le string depuis latin1 vers utf-8
  let FinalJSON = Buffer.from(JSONDatastring, "utf-8").toString();
  console.log('ecriture de data.json...');
  fs.writeFileSync("data.json", FinalJSON);
  console.log('fichier data.json ecrit');
};
//getData();

const readData = require('./server/carbu/processCarbuData');
// readData.getDataJson('ville','Paris');
readData.getDataJson('departement', 'VAL D\'OISE');
console.log(readData.getGpsCoordinates()[0]);
console.log(readData.getAddress()[0]);
console.log(readData.getCarburant()[0]);

console.log("fin du serveur");
