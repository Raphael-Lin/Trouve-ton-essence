var readJson = require('./readJson');
var readCsv = require('./readCsv');

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
    
    // On convertit les coordonnées au format utilisable sur google maps
    let lat;
    let long;
    if(gpsCoordinates[0].indexOf('.') == -1 && gpsCoordinates[1].indexOf('.') == -1){
      lat = gpsCoordinates[0].substr(0,2) + '.' + gpsCoordinates[0].substr(2);
      long = gpsCoordinates[1].substr(0,1) + '.' + gpsCoordinates[1].substr(1);
    }else{
      let latIndex = gpsCoordinates[0].indexOf('.');
      let longIndex = gpsCoordinates[1].indexOf('.');
      lat = gpsCoordinates[0].substr(0,2) + '.' + gpsCoordinates[0].substr(2,latIndex - 2) + gpsCoordinates[0].substr(latIndex + 1);
      long = gpsCoordinates[1].substr(0,1) + '.' + gpsCoordinates[1].substr(1,longIndex - 1) + gpsCoordinates[1].substr(longIndex + 1);
    }
    gpsCoordinates[0] = lat;
    gpsCoordinates[1] = long;
    
    gpsStationsCoordinates.push(gpsCoordinates);
  }
  return gpsStationsCoordinates;
}

/**
 * On obtient l'adresse de chaque station sous forme de liste :
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
 * On obtient le carburant avec son prix pour chaque station sous forme de liste :
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