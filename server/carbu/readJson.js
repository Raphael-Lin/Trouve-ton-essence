const fs = require("fs");
const collect = require('collect.js');  
const readCsv = require("./readCsv");

/**
 *  Charge le fichier JSON en RAM et le parse.
 */
const readJson = function () {
  let JsonData = fs.readFileSync("data.json");
  return JSON.parse(JsonData);
}

/**
 * Recherche dans les données les stations dans la ville indiqué.
 */
exports.searchDataCity = function (ville, carburant) {
  let ParsedJsonData = readJson();
  var resultData = [];
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    if ((ParsedJsonData.pdv_liste.pdv[i].ville._text == ville 
       || ParsedJsonData.pdv_liste.pdv[i].ville._text == ville.toUpperCase())
       && (ParsedJsonData.pdv_liste.pdv[i].prix != undefined)) {
      
      // pour chaque carburant de la station, on regarde si l'utilisateur en demande au moins 1
      for(let j = 0; j < ParsedJsonData.pdv_liste.pdv[i].prix.length; j++){
        for(let k = 0; k < carburant.length; k++){
          if(ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.nom == carburant[k]){
            resultData.push(ParsedJsonData.pdv_liste.pdv[i]);
            break;
            break;
          }
        }
      }
    }
  }
  return resultData;
};

/**
 * Récupère les données des stations avec le nom de département indiqué.
 */
exports.searchDataDepartment = function (department, carburant){
  // console.log(department);
  let codeDep = readCsv.searchCodeDepartment(department);
  // console.log(codeDep);
  let ParsedJsonData = readJson();
  var resultData = [];
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    if (ParsedJsonData.pdv_liste.pdv[i]._attributes.cp.substring(0,2) == codeDep
       && (ParsedJsonData.pdv_liste.pdv[i].prix != undefined)) {
      // console.log("dans la recherche précise");
      // pour chaque carburant de la station, on regarde si l'utilisateur en demande au moins 1
      for(let j = 0; j < ParsedJsonData.pdv_liste.pdv[i].prix.length; j++){
        for(let k = 0; k < carburant.length; k++){
          // console.log("après la boule de carburant");
          if(ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.nom == carburant[k]){
            resultData.push(ParsedJsonData.pdv_liste.pdv[i]);
            // console.log("carburant trouvé");
            break;
            break;
          }
        }
      }
    }
  }
  return resultData;
}
