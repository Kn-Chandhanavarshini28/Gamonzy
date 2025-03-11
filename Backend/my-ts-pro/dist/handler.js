"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// src/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);

// src/game.ts
var Game = class {
  symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
  currentBalance = 0;
  spinCount = 0;
  currentUser = null;
  matrix = [];
  bet = [];
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
__name(Game, "Game");

// src/handler.ts
var game = new Game();
var handler = /* @__PURE__ */ __name(async (event) => {
  game.spin(event.bets);
  let one = game.matrix;
  let two = game.check();
  let output = {
    "matrix": one,
    "winnings": two
  };
  return output;
}, "handler");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2hhbmRsZXIudHMiLCAiLi4vc3JjL2dhbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2dhbWUnO1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XHJcbiAgICBnYW1lLnNwaW4oZXZlbnQuYmV0cyk7XHJcbiAgICBsZXQgb25lPShnYW1lLm1hdHJpeCk7XHJcbiAgICBsZXQgdHdvPWdhbWUuY2hlY2soKTtcclxuICAgIGxldCBvdXRwdXQ9e1xyXG4gICAgICAgIFwibWF0cml4XCI6b25lLFxyXG4gICAgICAgIFwid2lubmluZ3NcIjp0d29cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbn07XHJcbiIsICJleHBvcnQgY2xhc3MgR2FtZXtcclxuICAgIFxyXG4gc3ltYm9scyA9IFsnIScsICdAJywgJyMnLCAnJCcsICclJywgJ14nLCAnJicsICcqJ107XHJcbiBjdXJyZW50QmFsYW5jZTogbnVtYmVyID0gMDtcclxuIHNwaW5Db3VudDogbnVtYmVyID0gMDtcclxuIGN1cnJlbnRVc2VyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuIG1hdHJpeDogc3RyaW5nW11bXSA9IFtdO1xyXG4gYmV0Om51bWJlcltdPVtdO1xyXG5cclxuZ2V0UmFuZG9tU3ltYm9sKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ltYm9scy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sc1tyYW5kb21JbmRleF07XHJcbn1cclxuXHJcbmdlbmVyYXRlTWF0cml4KCk6IHN0cmluZ1tdW10ge1xyXG4gICAgdGhpcy5tYXRyaXg9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBjb25zdCByb3c6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgcm93LnB1c2godGhpcy5nZXRSYW5kb21TeW1ib2woKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWF0cml4LnB1c2gocm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm1hdHJpeDtcclxufVxyXG5cclxuIHNwaW4oYmV0czogbnVtYmVyW10pOiB2b2lkIHtcclxuICAgIHRoaXMuYmV0PWJldHM7XHJcbiAgICBsZXQgc3BpbkNvdW50PTA7XHJcbiAgICBzcGluQ291bnQrKztcclxuICAgIGNvbnN0IG1hdHJpeCA9IHRoaXMuZ2VuZXJhdGVNYXRyaXgoKTtcclxuXHJcbiAgICBpZiAoYmV0cy5maWx0ZXIoYmV0ID0+IGJldCA+IDApLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmlzUHJpbWUoc3BpbkNvdW50KSkge1xyXG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gYmV0cy5maW5kSW5kZXgoYmV0ID0+IGJldCA+IDApO1xyXG4gICAgICAgIG1hdHJpeFtyb3dJbmRleF0gPSBbdGhpcy5nZXRSYW5kb21TeW1ib2woKSwgdGhpcy5nZXRSYW5kb21TeW1ib2woKSwgdGhpcy5nZXRSYW5kb21TeW1ib2woKV0ubWFwKHN5bWJvbCA9PiBzeW1ib2wgPXRoaXMuc3ltYm9sc1swXSk7XHJcbiAgICB9IGVsc2UgaWYgKGJldHMuZmlsdGVyKGJldCA9PiBiZXQgPiAwKS5sZW5ndGggPT09IDIgJiYgc3BpbkNvdW50ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hdHJpeFtpXSA9IFt0aGlzLnN5bWJvbHNbMF0sIHRoaXMuc3ltYm9sc1swXSwgdGhpcy5zeW1ib2xzWzBdXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGJldHMuZmlsdGVyKGJldCA9PiBiZXQgPiAwKS5sZW5ndGggPT09IDMgJiYgc3BpbkNvdW50ICUgMyA9PT0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hdHJpeFtpXSA9IFt0aGlzLnN5bWJvbHNbMF0sIHRoaXMuc3ltYm9sc1swXSwgdGhpcy5zeW1ib2xzWzBdXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbmNoZWNrKCl7XHJcbiAgICBjb25zdCByb3dXaW5zID0gdGhpcy5jaGVja1Jvd1dpbih0aGlzLm1hdHJpeCk7XHJcbiAgICBjb25zdCB3aW5uaW5ncyA9IHRoaXMuY2FsY3VsYXRlV2lubmluZ3ModGhpcy5iZXQsIHJvd1dpbnMpO1xyXG4gICAgcmV0dXJuIHdpbm5pbmdzO1xyXG59ICBcclxuXHJcbiBjaGVja1Jvd1dpbihtYXRyaXg6IHN0cmluZ1tdW10pOiBib29sZWFuW10ge1xyXG4gICAgY29uc3Qgcm93V2luczogYm9vbGVhbltdID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBpZiAobWF0cml4W2ldWzBdID09PSBtYXRyaXhbaV1bMV0gJiYgbWF0cml4W2ldWzFdID09PSBtYXRyaXhbaV1bMl0pIHtcclxuICAgICAgICAgICAgcm93V2luc1tpXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvd1dpbnM7XHJcbn1cclxuIGNhbGN1bGF0ZVdpbm5pbmdzKGJldHM6IG51bWJlcltdLCByb3dXaW5zOiBib29sZWFuW10pOiBudW1iZXIge1xyXG4gICAgbGV0IHdpbm5pbmdzID0gMDtcclxuICAgIGxldCByb3dzV29uID0gcm93V2lucy5maWx0ZXIod2luID0+IHdpbikubGVuZ3RoO1xyXG5cclxuICAgIGlmIChyb3dzV29uID49IDIgJiYgYmV0cy5maWx0ZXIoYmV0ID0+IGJldCA+IDApLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIHdpbm5pbmdzICs9IDIwOyAvLyBCb251cyBmb3Igd2lubmluZyBvbiAyIHJvd3Mgd2hlbiBiZXR0aW5nIG9uIDIgcm93c1xyXG4gICAgfVxyXG4gICAgaWYgKHJvd3NXb24gPT09IDMgJiYgYmV0cy5maWx0ZXIoYmV0ID0+IGJldCA+IDApLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgIHdpbm5pbmdzICs9IDUwOyAvLyBCb251cyBmb3Igd2lubmluZyBvbiBhbGwgMyByb3dzIHdoZW4gYmV0dGluZyBvbiBhbGwgMyByb3dzXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBpZiAocm93V2luc1tpXSkge1xyXG4gICAgICAgICAgICB3aW5uaW5ncyArPSBiZXRzW2ldOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdpbm5pbmdzO1xyXG59XHJcbmlzUHJpbWUobnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGlmIChudW0gPD0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG51bSA8PSAzKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChudW0gJSAyID09PSAwIHx8IG51bSAlIDMgPT09IDApIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSA1OyBpICogaSA8PSBudW07IGkgKz0gNikge1xyXG4gICAgICAgIGlmIChudW0gJSBpID09PSAwIHx8IG51bSAlIChpICsgMikgPT09IDApIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FPLElBQU0sT0FBTixNQUFVO0FBQUEsRUFFaEIsVUFBVSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUss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
