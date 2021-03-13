const Card = require("../../classes/card.js");

function parseCard(str) {
  if (str) {
    const [char, pos] = str.split(":");
    return new Card(char, +pos);
  } else {
    return null;
  }
}

module.exports = parseCard;