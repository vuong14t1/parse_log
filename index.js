const lineReader = require('line-reader');
var fs = require('fs');
var parse_jackpot = require("./features/parse_jackpot.js");
var parse_giftcode = require("./features/parse_giftcode.js");
processInput(process.argv);

function processInput(input) {
    var cmds = input.slice(2);
    console.log(cmds);
    var cmd = cmds[0] === undefined ? "jackpot" : cmds[0];
    switch(cmd) {
        case "jackpot":
            parse_jackpot.doExportJackpot();
        break;
        case "giftcode":
            parse_giftcode.doExportGiftCode();
        break;
        case "help":
        console.log("input parameter");
        break;
    }
}