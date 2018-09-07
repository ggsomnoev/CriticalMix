let xtj = require('xls-to-json');
let fs = require('fs');

const INPUT_FILE = "resources/Tracking Title List 9-2-18.xls";
const VARBS = ["TITLE+STAR", "FRANCHISE NAME", "DP TITLE"];

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
function extractData(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j of Object.keys(data[i])) {
            if (!VARBS.includes(j)) {
                delete data[i][j];
            }
        }
        if (data[i][VARBS[0]] == "" && data[i][VARBS[1]] == "" && data[i][VARBS[2]] == "") {
            data.splice(i, 1);
            i--;
        }
    }
}

extractData(rows);

for (let i = 0; i < rows.length; i++) {
    //BRANDNAMES
    console.log(rows[i][VARBS[1]]);
    //MLFULL    
    //console.log(rows[i][VARBS[0]]);
    //MLSHORT
    //console.log(rows[i][VARBS[2]]);
}


