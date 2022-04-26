const fs = require("fs");
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
    if (ParsedJsonData.pdv_liste.pdv[i].ville._text == ville || ParsedJsonData.pdv_liste.pdv[i].ville._text == ville.toUpperCase()) {
      resultData.push(ParsedJsonData.pdv_liste.pdv[i]);
    }
  }
  console.log(resultData[0]);
  return resultData;
};

/**
 * Récupère les données des stations avec le nom de département indiqué.
 */
exports.searchDataDepartment = function (department, carburant){
  console.log(department);
  let codeDep = readCsv.searchCodeDepartment(department);
  console.log(codeDep);
  let ParsedJsonData = readJson();
  var resultData = [];
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    if (ParsedJsonData.pdv_liste.pdv[i]._attributes.cp.substring(0,2) == codeDep) {
      resultData.push(ParsedJsonData.pdv_liste.pdv[i]);
    }
  }
  return resultData;
}
