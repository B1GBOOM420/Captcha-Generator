const { StartingProccess, Repeater, Hault } = require("./core/functions");
require("dotenv").config();

const duration = process.env.DURATION;

StartingProccess();
Repeater();

setTimeout(Hault, duration * 1000);