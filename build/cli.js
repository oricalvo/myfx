const {spawn} = require("child_process");

const command = process.argv[2];

const main = require("./main");
main[command]();
