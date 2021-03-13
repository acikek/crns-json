const Turn = require("../../classes/turn.js");
const parseSetup = require("./setup.js");

function parseGame(strs) {
  if (Array.isArray(strs)) {
    strs = strs.filter(s => !s.startsWith("#"));

    const setup = parseSetup(strs.splice(0, 1)[0]);
    const turns = strs.map((s, i) => new Turn(i % 2 == 0 ? "B" : "R", s));

    return { setup, turns };
  } else {
    return null;
  }
}

module.exports = parseGame;