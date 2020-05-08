const lineReader = require('line-reader');
var fs = require('fs');
var dataGiftCode = "";
function doExportGiftCode() {
    lineReader.eachLine('logs/giftcode.txt', function(line, last) {
       dataGiftCode += line;
       dataGiftCode += "\n";
       if(last) {
           exportFileExcel(dataGiftCode, "giftcode");
       }
   });
}
function exportFileExcel(data, fileName) {
    fs.appendFile(fileName + '.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
     });
}
exports.doExportGiftCode = doExportGiftCode;