const fs = require("fs");
const { EOL } = require("os");

const { CNRSGame } = require("../../classes/data.js");
const action = require("../wrappers/action.js");

/**
 * Converts a JSON file to CRNS data.
 * 
 * @param {String} dir The file path.
 * @returns {CNRSGame} `CRNSGame`
 */

function convert(dir) {
  if (!dir.endsWith(".json")) throw new Error("Path must be a valid JSON file.");
  const file = JSON.parse(fs.readFileSync(dir));

  const headers = Object.entries(file.headers).map(h => `@${h[0]} ${h[1]}`).join(EOL);
  const setup = Object.values(file.setup).flat().join("");

  const turns = file.turns.map(t => {
    if (!t.actions) return "-";
    let result = [], card;

    t.actions.forEach(a => {
      let res = [];

      const act = action(null, { data: a });
      const c = act.type == "swap" ? 
        act.initiator : act.type == "attack" ?
        act.attacker : act.card;

      const c_string = `${c.id}${c.servant ? `+${c.servant}` : ""}:${c.position}`;

      if (c_string != card) {
        card = c_string;
        res.push(c_string);
      }

      res.push(act.toString());
      result.push(res.join(""));
    });

    return result.reduce((p, c) => [p, c].join(c.charAt(0).match(/([pmxsc])/) ? "" : ";"));
  }).join(EOL);

  return new CNRSGame(`${headers}${EOL+EOL}${setup}${EOL}${turns}`);
}

module.exports = convert;