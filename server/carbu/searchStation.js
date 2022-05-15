const fs = require("fs");
const collect = require('collect.js');  
const readCsv = require("./searchCodeDep");


/**
 *  Charge le fichier JSON en RAM et le parse.
 */
const readJson = function () {
  let JsonData = fs.readFileSync("data.json");
  return JSON.parse(JsonData);
}


/**
 * Récupère les données des stations avec le nom de la ville et le ou les carburant(s) indiqué(s).
 */
exports.searchDataCity = function (ville, carburant) {
  let ParsedJsonData = readJson();
  var resultData = [];
  
  // Pour chaque station
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    // Si la station est dans la bonne ville et a un prix défini
    if ((ParsedJsonData.pdv_liste.pdv[i].ville._text == ville 
       || ParsedJsonData.pdv_liste.pdv[i].ville._text == ville.toUpperCase())
       && (ParsedJsonData.pdv_liste.pdv[i].prix != undefined)) {
      let item = getCarburantPrice(ParsedJsonData.pdv_liste.pdv[i], carburant);
      if(item != undefined)
        resultData.push(item);
      else
        console.log(item);
    }
  }
  return resultData;
};


/**
 * Récupère les données des stations avec le nom de département et le ou les carburant(s) indiqué(s).
 */
exports.searchDataDepartment = function (department, carburant){
  let codeDep = readCsv.searchCodeDepartment(department);
  let ParsedJsonData = readJson();
  var resultData = [];
  
  // Pour chaque station
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    // Si la station est dans le bon département et a un prix défini
    if (ParsedJsonData.pdv_liste.pdv[i]._attributes.cp.substring(0,2) == codeDep
       && (ParsedJsonData.pdv_liste.pdv[i].prix != undefined)) {
      let item = getCarburantPrice(ParsedJsonData.pdv_liste.pdv[i], carburant);
      if(item != undefined)
        resultData.push(item);
      else
        console.log(item);
    }
  }
  console.log(resultData.length);
  
  return resultData;
}


/**
 * Vérifie si la station donnée a au moins un des carburants demandés.
 */
function getCarburantPrice(item, carburant){
  for(let j = 0; j < item.prix.length; j++){
    for(let k = 0; k < carburant.length; k++){
      if(item.prix[j]._attributes.nom == carburant[k]){
        return item;
      }
    }
  }
  return undefined;
}