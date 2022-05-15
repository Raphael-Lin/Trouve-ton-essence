var readJson = require('./searchStation');
var readCsv = require('./searchCodeDep');

// Stocke toutes les données de la recherche faîte par l'utilisateur
var data;


/**
 * Obtient les données liées à la recherche de l'utilisateur et prépare l'organisation
 * des données qui seront transmisent à l'utilisateur.
 */
exports.getDataJson = function (mode, lieu, carburant) {
  if(mode == 'ville'){
    data = readJson.searchDataCity(lieu, carburant);
  }
  else if(mode == 'departement'){
    data = readJson.searchDataDepartment(lieu, carburant);
  }
  else{
    console.log("Le mode de recherche indiqué n\'est pas connu, veuillez indiqué 'ville' ou 'departement' ");
  }
}


/**
 * On obtient les coordonnées GPS de chaque station sous forme de liste:
 * - latitude
 * - longitude
 */
exports.getGpsCoordinates = function () {
  var gpsStationsCoordinates = [];
  for (let i = 0; i < data.length; i++){
    let gpsCoordinates = [
      data[i]._attributes.latitude, 
      data[i]._attributes.longitude
    ];
    
    gpsCoordinates = adaptCoordinates(gpsCoordinates[0], gpsCoordinates[1]);
    
    gpsStationsCoordinates.push(gpsCoordinates);
  }
  return gpsStationsCoordinates;
}


/**
 * Ajoute des 0 au début des coordonnées non précises.
 */
function completeCoordinates(latitude, longitude){
  // longitudes négatives
  if(longitude.indexOf('-') != -1){
    while(longitude.length < 6){
      longitude = longitude.substring(0,1) + '0' + longitude.substring(1,longitude.length);
    }
  }
  // longitudes positives
  else{
    while(longitude.length < 5){
      longitude = '0' + longitude.substring(0,longitude.length);
    }
  }
  return new Array(latitude,longitude);
}


/**
 * Supprime une éventuelle précision inutile pour les coordonées gps. 
 */
function cleanCoordinates(latitude, longitude){
  let pointLatIndex = latitude.indexOf('.');
  let pointLongIndex = longitude.indexOf('.');
  
  //On enlève les éventuelles précisions inutiles dans les coordonnées
  if(latitude.indexOf('.') != -1 && longitude.indexOf('.') != -1){
    latitude = latitude.substring(0,pointLatIndex);
    longitude = longitude.substring(0,pointLongIndex);
  }
  else if(latitude.indexOf('.') != -1 && longitude.indexOf('.') == -1){
    latitude = latitude.substring(0,pointLatIndex);
  }
  else if(latitude.indexOf('.') == -1 && longitude.indexOf('.') != -1){
    longitude = longitude.substring(0,pointLongIndex);
  }
  let coordinates = completeCoordinates(latitude, longitude);
  return coordinates;
}


/**
 * Convertit les coordonnées latitude et longitude dans des coordonnées compréhensible par google maps.
 */
function adaptCoordinates(latitude, longitude){
  // prépare la conversion des coordonnées
  let coordinates = cleanCoordinates(latitude, longitude);
  let lat;
  let long;
  let latPrefixSize = 2;
  let longPrefixSize = 1;
  if(coordinates[0].indexOf('-') != -1){
    latPrefixSize = 3;
  }
  if(coordinates[1].indexOf('-') != -1){
    longPrefixSize = 2;
  }

  // convertit la latitude et la longitude en format utilisable par google maps
  lat = coordinates[0].substring(0,latPrefixSize) + '.' + coordinates[0].substring(latPrefixSize);
  if(longPrefixSize == 2){
    if(coordinates[1].length == 7)
      long = coordinates[1].substring(0,longPrefixSize) + '.' + coordinates[1].substring(longPrefixSize,
                                                                                         coordinates[1].length);
    else
      long = '-0.' + coordinates[1].substring(1,6);
  }
  else{
    if(coordinates[1].length == 6)
      long = coordinates[1].substring(0,longPrefixSize) + '.' + coordinates[1].substring(longPrefixSize,6);
    else
      long = '0.' + coordinates[1].substring(0,5);
  }
  
  return new Array(lat,long);
}


/**
 * Récupère l'adresse de chaque station sous forme de liste :
 * - numéro et nom de rue (avenue, ...)
 * - code postal
 * - ville
 */
exports.getAddress = function () {
  var stationsAddress = [];
  data.forEach(function(item, index, array){
    let address = [
      item.adresse._text,
      item._attributes.cp,
      item.ville._text
      ];
    stationsAddress.push(address);
  });
  return stationsAddress;
}


/**
 * Récupère le carburant avec son prix pour chaque station sous forme de liste :
 * - clé = <nom_carburant>
 * - valeur = <prix>
 */
exports.getCarburant = function () { 
  var carburantStations = new Array();
  data.forEach(function(item, index, array){
    carburantStations.push(pushCarburant(item));
  });
  return carburantStations
}


/**
 * Renvoie une map avec le couple <nom_carburant> : <prix> pour une station.
 */
function pushCarburant(item) {
  var carburant = new Map();
  if(item.prix != undefined){
    for(let i = 0; i < item.prix.length; i++){
      carburant.set(
        item.prix[i]._attributes.nom, 
        item.prix[i]._attributes.valeur
      );
    }
  }
  return carburant;
}