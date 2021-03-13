const int$ = require("../wrappers/int.js");

function parsePosition(pos) {
  return pos.toString().match(/[1-4]/) ? int$(pos) : null;
}

module.exports = parsePosition;