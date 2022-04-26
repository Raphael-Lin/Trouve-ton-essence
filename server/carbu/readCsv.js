const fs = require("fs");
const csv = require('csv-parse');

const DEP_CODE_NUMBER = 99


/**
 * On lit le fichier csv pour récupérer les correspondances code département et nom du département.
 */ 
let res;
var dataDep = fs.readFileSync('cp_departement.csv', 'utf8');
csv.parse(dataDep, (err, records) => {
  if (err) {
    console.error(err)
    return res.status(400).csv({success: false, message: 'An error occurred'})
  }
});
var data = dataDep.split(',' && '\n');


/**
 * Trouve le code associé au département indiqué.
 */
exports.searchCodeDepartment = function (department) {
  for(let i=0; i < DEP_CODE_NUMBER; i++){
    if(data[i].substring(3) == department || data[i].substring(3) == department.toUpperCase()){
      return data[i].substring(0,2);
    }
  }
};