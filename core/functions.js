const createCaptcha = require("./captcha");
const fs = require("fs");
const colors = require("colors");
require("dotenv").config();
var ProgressBar = require("progress");

const duration = process.env.DURATION;
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString("en-US", { hour12: false });
const adjustedTime = time.replace(/:/g, "-").slice(0, -3);

async function StartingProccess() {
  const startingString = `exports.CaptchaList = [`;

  try {
    fs.readdirSync(`generated/${date}`);
  } catch {
    await fs.mkdirSync(`generated/${date}`);
  }

  await fs.mkdirSync(`generated/${date}/Time-${adjustedTime}`);
  await fs.appendFileSync(
    `generated/${date}/Time-${adjustedTime}/${date}-${adjustedTime}.js`,
    startingString
  );

  console.log(
    `[STARTING]   >>`.brightYellow + " | Starting to generate Captcha photos..."
  );

  var bar = new ProgressBar(
    "[GENERATING] >> ".brightCyan +
      "| " +
      ":bar".brightCyan +
      " | :percent |".white +
      " :etas".brightGreen,
    {
      complete: "▨",
      incomplete: " ",
      width: 25,
      total: 300,
    }
  );

  var i = 0,
    steps = [
      0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12,
      0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24,
      0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36,
      0.37, 0.38, 0.39, 0.4, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48,
      0.49, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6,
      0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72,
      0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.8, 0.81, 0.82, 0.83, 0.84,
      0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96,
      0.97, 0.98, 0.99, 1.0,
    ];

  (function next() {
    if (i >= steps.length) {
    } else {
      bar.update(steps[i++]);
      setTimeout(next, (duration / 100) * 950);
    }
  })();
}
async function Repeater() {
  setInterval(() => {
    createCaptcha(date, adjustedTime);
  }, 50);
}
async function Hault() {
  await fs.appendFile(
    `generated/${date}/Time-${adjustedTime}/${date}-${adjustedTime}.js`,
    "]",
    () => {}
  );

  const dir = `./generated/${date}/Time-${adjustedTime}/Images`;

  await fs.readdir(dir, (err, files) => {
    console.log(
      `[COMPLETE]   >>`.brightGreen +
        ` | Aprox. ` +
        `${files.length}`.brightGreen +
        ` Captchas were generated in ${duration} seconds. `
    );

    console.log(
      `[LOCATION]   >>`.brightBlue + " | ".white + `${dir}`.brightBlue
    );

    console.log("\nCreated By B1GBOOM | Fred B | 2021".brightYellow);
    console.log("Github => https://github.com/B1GBOOM420".brightBlue);
    console.log("Contact => dev.b1gboom@gmail.com".brightGreen);

    return process.exit();
  });
}

module.exports = {
  StartingProccess,
  Repeater,
  Hault,
};
