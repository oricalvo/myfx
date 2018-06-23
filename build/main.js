const path = require("path");
const {promisify} = require("util");
const {spawn} = require("build-utils/process");

async function dev() {
    await spawn(path.normalize("node_modules/.bin/webpack-dev-server"), [], {
        shell: true,
        stdio: "inherit",
        wait: false,
    });
}

exports.dev = dev;
