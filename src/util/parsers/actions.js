const action = require("../wrappers/action.js");
const action_m = /(?:[2-9]|10|J|Q|K|A)(?:\+[2-4]|):[1-4](?:(?:[pmxsc])(?:(?:[2-9]|10|J|Q|K|A)(?:\+[2-4]|):[1-4]|[1-4]|(?:[2-9]|10|J|Q|K|A|)+))+|-/;

function parseActions(str) {
  if (str) {
    const actions = str.split(";");
    let result = [];

    actions
      .filter(a => a.match(action_m))
      .forEach(a => {
        if (a.startsWith("-")) return result.push(null);

        const card = a.match(/(?:[2-9]|10|J|Q|K|A)(?:\+[2-4]|):[1-4]/)[0];
        const events = a.split(card)[1].match(/(?:[pmxsc])(?:(?:[2-9]|10|J|Q|K|A)(?:\+[2-4]|):[1-4]|[1-4]|(?:[2-9]|10|J|Q|K|A|)+)/g);

        events.forEach(e => {
          const id = e.slice(0, 1);
          const target = e.slice(1);

          result.push(action(id, {
            card, target: target || null
          }));
        });
      });

    return result;
  } else {
    return null;
  }
}

module.exports = parseActions;