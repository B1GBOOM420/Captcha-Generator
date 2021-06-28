const createCaptcha = require("./captcha");
const fs = require("fs");
const colors = require("colors");

const duration = process.env.DURATION;
const date = new Date().toLocaleDateString();
const quad = duration / 4;
const halfIt = duration / 2;
const triple = quad * 3;

function TwentyFive() {
  console.log(
    `[WORKING] >>`.brightBlue +
      ` Status:  25% | There are ${triple} seconds remaining`
  );
}
async function Fifty() {
  console.log(
    `[WORKING] >>`.brightBlue +
      ` Status:  50% | There are ${halfIt} seconds remaining`
  );
}
async function SeventyFive() {
  console.log(
    `[WORKING] >>`.brightBlue +
      ` Status:  75% | There are ${quad} seconds remaining`
  );
}
async function FinishNLog() {
  console.log(
    `[WORKING] >>`.brightBlue + ` Status: 100% | There are 0 seconds remaining`
  );
}
async function StartingProccess() {
  console.log(
    `[STARTING]>>`.brightYellow + " Starting to generate Captcha photos..."
  );
}
async function RunTimeInfo() {
  console.log(
    `[RUNTIME] >>`.brightYellow +
      ` Currently Runtime set to ${duration} seconds `
  );
}

async function Repeater() {
  setInterval(() => {
    createCaptcha(date);
  }, 50);
}

function Hault() {
  const dir = `./src/captchas-${date}`;

  fs.readdir(dir, (err, files) => {
    console.log(
      `[COMPLETE]>>`.brightGreen +
        ` Aprox. ` +
        `${files.length - 1}`.brightGreen +
        ` Captchas are available in ` +
        `${dir}`.brightBlue
    );

    return process.exit();
  });
}

function TimeConverter(number) {
  number * 1000;
}

function MinusOne(number) {
  number - 1;
}

module.exports = {
  TwentyFive,
  Fifty,
  SeventyFive,
  FinishNLog,
  StartingProccess,
  RunTimeInfo,
  Repeater,
  Hault,
  TimeConverter,
  MinusOne,
};
