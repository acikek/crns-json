const Card = require("./card.js");

class Action {
  _setData(data) {
    Object.assign(this, data);
  }

  _toString(type, target) {
    return `${type}${target instanceof Card ? `${target.id}${target.servant ? `+${target.servant}` : ""}` : target != null ? target : ""}`;
  }
}

class Place extends Action {
  constructor(card, data) {
    super();

    if (data) {
      this._setData(data);
    } else {
      this.type = "place";
      this.card = card;
    }
  }

  toString() {
    return this._toString("p");
  }
}

class Attack extends Action {
  constructor(a, t, data) {
    super();

    if (data) {
      this._setData(data);
    } else {
      this.type = "attack";
      this.attacker = a;
      
      if (t) this.target = t;
    }
  }

  toString() {
    return this._toString("x", this.target);
  }
}

class Move extends Action {
  constructor(card, d, data) {
    super();
    
    if (data) {
      this._setData(data);
    } else {
      this.type = "move";
      this.card = card;
      this.destination = d;
    }
  }

  toString() {
    return this._toString("m", this.destination);
  }
}

class Swap extends Action {
  constructor(i, c, data) {
    super();

    if (data) {
      this._setData(data);
    } else {
      this.type = "swap";
      this.initiator = i;
      this.counterpart = c;
    }
  }
  
  toString() {
    return this._toString("s", this.counterpart);
  }
}

class Chase extends Action {
  constructor(card, r, data) {
    super();

    if (data) {
      this._setData(data);
    } else {
      this.type = "chase";
      this.card = card;
      this.reset = r;
    }
  }

  toString() {
    return this._toString("c", this.reset.join(""));
  }
}

module.exports = { Place, Attack, Move, Swap, Chase };