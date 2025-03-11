"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// my-ts-pro/src/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);

// my-ts-pro/src/game.ts
var Game = class {
  constructor() {
    __publicField(this, "symbols", ["!", "@", "#", "$", "%", "^", "&", "*"]);
    __publicField(this, "currentBalance", 0);
    __publicField(this, "spinCount", 0);
    __publicField(this, "currentUser", null);
    __publicField(this, "matrix", []);
    __publicField(this, "bet", []);
  }
  getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[randomIndex];
  }
  generateMatrix() {
    this.matrix = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.getRandomSymbol());
      }
      this.matrix.push(row);
    }
    return this.matrix;
  }
  spin(bets) {
    this.bet = bets;
    let spinCount = 0;
    spinCount++;
    const matrix = this.generateMatrix();
    if (bets.filter((bet) => bet > 0).length === 1 && this.isPrime(spinCount)) {
      const rowIndex = bets.findIndex((bet) => bet > 0);
      matrix[rowIndex] = [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()].map((symbol) => symbol = this.symbols[0]);
    } else if (bets.filter((bet) => bet > 0).length === 2 && spinCount % 2 === 0) {
      for (let i = 0; i < 3; i++) {
        matrix[i] = [this.symbols[0], this.symbols[0], this.symbols[0]];
      }
    } else if (bets.filter((bet) => bet > 0).length === 3 && spinCount % 3 === 0) {
      for (let i = 0; i < 3; i++) {
        matrix[i] = [this.symbols[0], this.symbols[0], this.symbols[0]];
      }
    }
  }
  check() {
    const rowWins = this.checkRowWin(this.matrix);
    const winnings = this.calculateWinnings(this.bet, rowWins);
    return winnings;
  }
  checkRowWin(matrix) {
    const rowWins = [false, false, false];
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        rowWins[i] = true;
      }
    }
    return rowWins;
  }
  calculateWinnings(bets, rowWins) {
    let winnings = 0;
    let rowsWon = rowWins.filter((win) => win).length;
    if (rowsWon >= 2 && bets.filter((bet) => bet > 0).length === 2) {
      winnings += 20;
    }
    if (rowsWon === 3 && bets.filter((bet) => bet > 0).length === 3) {
      winnings += 50;
    }
    for (let i = 0; i < 3; i++) {
      if (rowWins[i]) {
        winnings += bets[i];
      }
    }
    return winnings;
  }
  isPrime(num) {
    if (num <= 1)
      return false;
    if (num <= 3)
      return true;
    if (num % 2 === 0 || num % 3 === 0)
      return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0)
        return false;
    }
    return true;
  }
};

// my-ts-pro/src/handler.ts
var game = new Game();
var handler = (event) => __async(void 0, null, function* () {
  game.spin(event.bets);
  let one = game.matrix;
  let two = game.check();
  let output = {
    "matrix": one,
    "winnings": two
  };
  return output;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=bundle.js.map
