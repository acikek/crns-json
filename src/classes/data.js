const fs = require("fs");

class Base {
  constructor(data) {
    this._data = data;
  }

  /**
   * The parsed or converted game data.
   * 
   * @returns {Object|String} The game data.
   */

  value() {
    return this._data;
  }

  /**
   * Logs the data to the console.
   */

  log() {
    console.log(this._data);
  }
}

class GameData extends Base {
  constructor(data) {
    super(data);
  }

  /**
   * Writes the data to a JSON file.
   * 
   * @param {String} dir The file path.
   * @param {Number} [tab=2] The tab whitespace length.
   * @returns {GameData} `GameData`
   */

  write(dir, tab = 2) {
    if (!dir.endsWith(".json")) throw new Error("Path must be a valid JSON file.");
    fs.writeFileSync(dir, JSON.stringify(this._data, null, tab)); return this;
  }
}

class CNRSGame extends Base {
  constructor(data) {
    super(data);
  }

  /**
   * Writes the data to a `.chase` file.
   * 
   * @param {String} dir The file path.
   * @returns {CNRSGame} `GNRSGame`
   */

   write(dir) {
    if (!dir.endsWith(".chase")) throw new Error("Path must be a valid CRNS file.");
    fs.writeFileSync(dir, this._data); return this;
  }
}

module.exports = { GameData, CNRSGame };