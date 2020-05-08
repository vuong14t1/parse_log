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
    if(dResult[properties[0] + properties[4]] == null) {
        dResult[properties[0] + properties[4]] = {
            uId: properties[0],
            count: 1,
            gold: properties[4]
        };
    }else {
        dResult[properties[0] + properties[4]] = {
            uId: properties[0],
            count: dResult[properties[0] + properties[4]].count + 1,
            gold: properties[4]
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
    console.log(data);
    return data;
}
exports.doExportJackpot = doExportJackpot;