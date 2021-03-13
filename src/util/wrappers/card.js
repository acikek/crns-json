const int$ = require("./int.js");
const royalty = [ "J", "Q", "K", "A" ];

function card(char, pos) {
  let servant = null, result = {};

  if (char.includes("+")) {
    let com = char.split("+");
    char = com[0]; servant = +com[1];
  }

  const id = int$(char);

  const c_class = typeof id == "number" ? 
    ( id > 1 && id < 5 ? "pawn" :
      id > 4 && id < 8 ? "minor" : 
      id > 7 && id < 11 ? "major" : null ) :
    royalty.includes(id) ? "royalty" : null;

  const power = typeof id == "number" ? 
    id > 1 && id < 11 ? id + servant || 0 : null 
    : id == "A" ? 0 :
      royalty.includes(id) ? 
      11 + [ "J", "Q", "K" ].indexOf(id) : null;
  
  const position = pos > 0 && pos < 5 ? pos : null;

  result = {
    class: c_class,
    id, power, position
  }

  if (c_class == "major") {
    result.servant = servant;
  }

  return result;
}

module.exports = card;