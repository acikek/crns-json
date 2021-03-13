const fs = require("fs");
const { EOL } = require("os");

const { GameData } = require("../../classes/data.js");
const parseGame = require("./game.js");

/**
 * Parses a `.chase` file into JSON data.
 * 
 * @param {String} dir The file path.
 * @returns {GameData} `GameData`
 */

function parse(dir) {
  if (!dir.endsWith(".chase")) throw new Error("Path must be a valid CRNS file.");
  const file = fs.readFileSync(dir).toString().split(EOL);

  const h_lines = file.filter(l => l.startsWith("@"));
  const g_lines = file.filter(l => !l.startsWith("@") && !l.startsWith("#") && !(l == " " || !l)).map(l => (l.includes("#") ? l.split("#")[0] : l).trim());

  const headers = h_lines
    .map(l => {
      const m = l.match(/@([\S]+) ([\s\S]+)/);
      let result = {}; result[m[1]] = m[2];

      return result;
    })
    .reduce((r, c) => Object.assign(r, c));

  const game = parseGame(g_lines);

  return new GameData(Object.assign({ headers }, game));
}

module.exports = parse;