const parseActions = require("../util/parsers/actions.js");

class Turn {
  constructor(p, str) {
    this.player = p;
    this.actions = parseActions(str);
  }
}

module.exports = Turn;