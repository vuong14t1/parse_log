const lineReader = require('line-reader');
var fs = require('fs');
var dResult = [];
async function doExportCfTicket(nameFile){
    var date = new Date();
    nameFile = nameFile === undefined? "compensate_cf_" + date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear(): nameFile;
    await lineReader.eachLine('logs/cf_ticket.txt', function(line, last) {
        addPropertiesToResult(getPropertiesLine(line));
        if(last) {
            exportFileExcel(formatDataTicket(), nameFile);
        }
    });
}


function getPropertiesLine(dataline) {
    var item = dataline.split("PaymentHandler     - ")[1];
    var propertiesOriginal = item.split(",");
    var properties = [];
    for(var i in propertiesOriginal) {
        properties.push(propertiesOriginal[i].trim());
    }
    return properties;
}

function addPropertiesToResult(properties) {
    switch(properties[1]){
        case "CODA_MM_6":
            properties[1] = 7;
        break;
        case "CODA_MM_7":
            properties[1] = 12;
        break;
        case "CODA_MM_8":
            properties[1] = 25;
        break;
        case "CODA_MM_9":
            properties[1] = 75;
        break;
        case "CODA_MM_10":
            properties[1] = 125;
        break;
    }

    console.log("pro " +JSON.stringify(properties));
    dResult.push({
        uId: properties[0],
        count: properties[1]
    });
}
function exportFileExcel(data, fileName) {
    fs.appendFile("./export/" + fileName + '.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
     });
}

function formatDataTicket() {
    var data = '';
    for(var i in dResult) {
        var item = dResult[i];
        var formatItem = item.uId + "\t" + item.count + "\n";
        data += formatItem;
    }
    console.log(data);
    return data;
}
exports.doExportCfTicket = doExportCfTicket;