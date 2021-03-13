# crns-json

Efficient and lightweight parsing and conversion between JSON and CRNS (`.chase`) files.

## Installation

```sh
npm install --save crns-json
```

## Example

```js
const crns = require("crns-json");

// Parse a CRNS file and write to JSON
crns.parse("./game.chase").write("./game.json");

// Convert the JSON result to CRNS, and log it
crns.convert("./game.json").log();
```

## Usage

Both **`parse`** and **`convert`** take a `dir` parameter, and have strict file ending checks.

Additionally, they both return a class object (**`GameData`** and **`CRNSGame`** respectively) which have:
* `write(dir)`: writes the data to a file and returns the class object
* `log()`: logs the data to the console

as methods.

## Links

* [crns-lang](https://github.com/acikek/crns-lang) (syntax highlighting for `.chase` files)