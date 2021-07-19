const { StartingProccess, Repeater, Hault } = require("./functions");
require("dotenv").config();

const duration = process.env.DURATION;

async function LaunchProgram() {
StartingProccess();
Repeater();
setTimeout(Hault, duration * 1000);
}

module.exports={
    LaunchProgram
}

