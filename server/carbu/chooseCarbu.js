const readData = require('./processCarbuData');

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