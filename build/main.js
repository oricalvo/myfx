const path = require("path");
const {promisify} = require("util");
const {run} = require("build-utils/process");

async function dev() {
    await run("webpack");
    await run("http-server -p 3000", {wait: false});
    await run("opener http://localhost:3000");
    await run("webpack --watch", {wait: false});
}

exports.dev = dev;
