const int$ = require("../wrappers/int.js");

function parseSetup(str, chase = false) {
  if (typeof str == "string") {
    const cards = str.match(/[2-9]|10|J|Q|K|A/g);
    const parsed = cards.map(int$);

    if (chase) {
      return parsed;
    } else {
      return {
        black: parsed.slice(0, 4),
        red: parsed.slice(4)
      }
    }
  } else {
    return null;
  }
}

module.exports = parseSetup;