const lineReader = require('line-reader');
var fs = require('fs');
var dResult = {};
async function doExportJackpot(nameFile){
    var date = new Date();
    nameFile = nameFile === undefined? "jackpot_" + date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear(): nameFile;
    await lineReader.eachLine('logs/jackpot.txt', function(line, last) {
        addPropertiesToResult(getPropertiesLine(line));
        if(last) {
            exportFileExcel(formatDataJackpot(), nameFile);
        }
    });
}


function getPropertiesLine(dataline) {
    var item = dataline.split("ItemLogger     -")[1];
    var propertiesOriginal = item.split("|");
    var properties = [];
    for(var i in propertiesOriginal) {
        properties.push(propertiesOriginal[i].trim());
    }
    return properties;
}

function addPropertiesToResult(properties) {
    console.log("===== " + JSON.stringify(properties));
    if(dResult[properties[0] + properties[3]] == null) {
        dResult[properties[0] + properties[3]] = {
            uId: properties[0],
            count: 1,
            gold: properties[3]
        };
    }else {
        dResult[properties[0] + properties[3]] = {
            uId: properties[0],
            count: dResult[properties[0] + properties[3]].count + 1,
            gold: properties[3]
        }; 
    }
}
function exportFileExcel(data, fileName) {
    fs.appendFile("./export/" + fileName + '.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
     });
}

function formatDataJackpot () {
    var data = '';
    for(var i in dResult) {
        var item = dResult[i];
        var formatItem = item.uId + "\t" + item.count + "\t" + item.gold + "\n";
        data += formatItem;
    }
    return data;
}
exports.doExportJackpot = doExportJackpot;