const card = require("../util/wrappers/card.js");

class Card {
  constructor(char, pos) {
    Object.assign(this, card(char, pos));
  }
}

module.exports = Card;