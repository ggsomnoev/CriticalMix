let xtj = require('xls-to-json');
let fs = require('fs');

const INPUT_FILE = "resources/Tracking Title List 9-2-18.xls";
const VARBS = ["FRANCHISE NAME", "TITLE+STAR", "DP TITLE"];
let newRow = {};
let result = [];

function convertXLSToJSON(inputFile) {
    return xtj({
        input: inputFile,  // input xls
        output: "resources/output.json", // output json
        sheet: "USTExport_TitleList_MainList"  // specific sheetname
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            //console.log(result);
        }
    });
}

//convertXLSToJSON(INPUT_FILE);
let rows = JSON.parse(fs.readFileSync('resources/output.json'));
//console.log(rows[0]);
for (let row of rows) {
    for (let j of Object.keys(row)) {
        if (!VARBS.includes(j)) {
            delete row[j];
        }
    }
}

console.log(rows);


