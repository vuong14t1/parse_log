const lineReader = require('line-reader');
var fs = require('fs');
var dataGiftCode = "";
function doExportGiftCode(nameFile) {
    var date = new Date();
    nameFile = nameFile === undefined? "giftcode_" + date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear(): nameFile;
    lineReader.eachLine('logs/giftcode.txt', function(line, last) {
       dataGiftCode += line;
       dataGiftCode += "\n";
       if(last) {
           exportFileExcel(dataGiftCode, nameFile);
       }
   });
}
function exportFileExcel(data, fileName) {
    fs.appendFile("./export/" + fileName + '.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
     });
}
exports.doExportGiftCode = doExportGiftCode;