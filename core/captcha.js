const Jimp = require("jimp");
const fs = require("fs");

function loadPlugins(jimpInstance, plugins) {
  const interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  for (const name of plugins) {
    const pluginModule = interopRequireDefault(require(`@jimp/plugin-${name}`));

    const plugin = pluginModule["default"](jimpInstance) || {};

    jimpInstance[Object.keys(plugin)[0]] =
      plugin[Object.getOwnPropertyNames(plugin)[0]];
  }
}

function randomString(len, charSet) {
  charSet = charSet || "ABCDEFGHJKLMNPRSTUVWXZabcdefhikmnorstuvwxz023456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

module.exports = async function createCaptcha(date, adjustedTime) {

  const captcha = randomString(6, "ABCDEFGHJKLMNorstuvwxz023456789");
  const image = new Jimp(520, 140, "black");
  // const font = await Jimp.loadFont('core/customs/moonRising/Moonrising.fnt')
  // const font = await Jimp.loadFont('core/customs/hemi/Hemi.fnt')
  const font = await Jimp.loadFont('core/customs/white/White.fnt')

  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const textWidth = Jimp.measureText(font, captcha);
  const textHeight = Jimp.measureTextHeight(font, captcha);
  image.print(font, w / 2 - textWidth / 2, h / 2 - textHeight / 2, captcha);
  loadPlugins(image, ["fisheye", "circle"]);
  image.fisheye({ r: 1.05 });
  image.blur(1);
  const data = `"${captcha}", `;
  await image.write(`generated/${date}/Time-${adjustedTime}/Images/${captcha}.png`);
  await fs.appendFile(`generated/${date}/Time-${adjustedTime}/${date}-${adjustedTime}.js`, data, () => {});

  return captcha;
};
