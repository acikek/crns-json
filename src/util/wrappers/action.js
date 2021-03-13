const { Place, Attack, Move, Swap, Chase } = require("../../classes/action.js");

const parseCard = require("../parsers/card.js");
const parsePosition = require("../parsers/position.js");
const parseSetup = require("../parsers/setup.js");

const types = {
  "place": Place,
  "attack": Attack,
  "move": Move,
  "swap": Swap,
  "chase": Chase
}

function action(char, options) {
  if (options.data) return new (types[options.data.type.toLowerCase()])(null, options.data.type == "place" ? options.data : null, options.data);

  const id = char.toLowerCase();
  const card = parseCard(options.card);

  let target = options.target;

  const c = (() => {
    switch (id) {
      case "p":
        target = null;
        return Place;
      case "x":
        target = target ? parseCard(target) : null;
        return Attack;
      case "m":
        target = parsePosition(target);
        return Move;
      case "s":
        target = parseCard(target);
        return Swap;
      case "c":
        target = parseSetup(target, true);
        return Chase;
      default:
        return null;
    }
  })();
  
  return c ? new c(card, target) : null;
}

module.exports = action;