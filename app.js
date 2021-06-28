require("dotenv").config();
const {
  StartingProccess,
  Repeater,
  RunTimeInfo,
  TwentyFive,
  Fifty,
  SeventyFive,
  FinishNLog,
  Hault
} = require('./src/functions');

const duration = process.env.DURATION;
const quad = duration / 4;
const halfIt = duration / 2;
const triple = quad * 3;

StartingProccess();
Repeater();
RunTimeInfo();

setTimeout(TwentyFive, quad * 1000);
setTimeout(Fifty, halfIt * 1000);
setTimeout(SeventyFive, triple * 1000);
setTimeout(FinishNLog, (duration - 1) * 1000);

setTimeout(Hault, duration * 1000);
