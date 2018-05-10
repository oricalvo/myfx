const path = require("path");
const {promisify} = require("util");
const {spawn} = require("build-utils/process");

async function dev() {
    console.log("dev");

    await spawn(path.normalize("node_modules/.bin/webpack-dev-server"), [], {
        shell: true,
        stdio: "inherit"
    });

}

exports.dev = dev;
