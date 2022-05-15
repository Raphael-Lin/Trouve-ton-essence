const readData = require('./processCarbuData');


/**
 * Rassemble toutes les données des stations possédant le ou les carburants demandé(s),
 * avec le département ou la ville spécifié
 * et trie les résultats en fonction du premier carburant choisi.
 */
exports.assemblyData = function(mode, lieu, carburant){
  var assemblyData = [];
  readData.getDataJson(mode, lieu, carburant);
  var coordinates = readData.getGpsCoordinates();
  var address = readData.getAddress();
  var carburants = readData.getCarburant();
  for(let i = 0; i < coordinates.length; i++){
    let data = new Array();
    data.push(coordinates[i]);
    data.push(address[i]);
    data.push(Object.fromEntries(carburants[i]));
    assemblyData.push(data);
  }
  
  return assemblyData;
}


/** 
 * Trie le résultat de la recherche des carburants en fonction du carburant (prioritaire) demandé. 
 */
exports.sortResult = function(assemblyData, carburant){
  if(carburant == "Gazole"){
    console.log("trie le Gazole");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].Gazole - b[2].Gazole;
    });
  }
  else if(carburant == "SP95"){
    console.log("trie le SP95");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].SP95 - b[2].SP95;
    });
  }
  else if(carburant == "SP98"){
    console.log("trie le SP98");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].SP98 - b[2].SP98;
    });
  }
  else if(carburant == "E85"){
    console.log("trie le E85");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].E85 - b[2].E85;
    });
  }
  else if(carburant == "E10"){
    console.log("trie le E10");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].E10 - b[2].E10;
    });
  }
  else if(carburant == "GPLc"){
    console.log("trie le GPLc");
    groupPriorityCarbu(assemblyData, carburant);
    assemblyData.sort(function(a, b) {
      return a[2].GPLc - b[2].GPLc;
    });
  }
}


/* 
 * On regroupe les stations avec le carburant indiqué ensemble, et les autres stations 
 * seront misent à la fin de la liste. 
 */
function groupPriorityCarbu(assemblyData, carburant){
  var carburants = [];
  var othersCarburants = [];
  for(let i = 0; i < assemblyData.length; i++){
    // console.log(assemblyData[i]);
    let carburantsStation = assemblyData[i][2];
    // console.log(carburantsStation);
    if(carburantsStation.hasOwnProperty(carburant)){
      carburants.push(assemblyData[i]);
    }
    else{
      othersCarburants.push(assemblyData[i]);
    }
  }
  
  assemblyData.splice(0, assemblyData.length);
  
  for(let i = 0; i < carburants.length; i++){
    assemblyData.push(carburants[i]);
  }
  for(let i = 0; i < othersCarburants.length; i++){
    assemblyData.push(othersCarburants[i]);
  }
}