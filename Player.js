"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerType = void 0;
const Piece_1 = require("./Piece");
var PlayerType;
(function (PlayerType) {
    PlayerType["UPPER"] = "UPPER";
    PlayerType["LOWER"] = "LOWER";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
class Player {
    constructor(type) {
        this.type = type;
        if (type === PlayerType.UPPER) {
            this.pieces = [
                new Piece_1.Griff(PlayerType.UPPER, { row: 0, col: 0 }),
                new Piece_1.Elephant(PlayerType.UPPER, { row: 0, col: 1 }),
                new Piece_1.Lion(PlayerType.UPPER, { row: 0, col: 2 }),
                new Piece_1.Elephant(PlayerType.UPPER, { row: 0, col: 3 }),
                new Piece_1.Griff(PlayerType.UPPER, { row: 0, col: 4 }),
                new Piece_1.Chick(PlayerType.UPPER, { row: 1, col: 1 }),
                new Piece_1.Chick(PlayerType.UPPER, { row: 1, col: 2 }),
                new Piece_1.Chick(PlayerType.UPPER, { row: 1, col: 3 }),
            ];
        }
        else {
            this.pieces = [
                new Piece_1.Griff(PlayerType.LOWER, { row: 4, col: 0 }),
                new Piece_1.Elephant(PlayerType.LOWER, { row: 4, col: 1 }),
                new Piece_1.Lion(PlayerType.LOWER, { row: 4, col: 2 }),
                new Piece_1.Elephant(PlayerType.LOWER, { row: 4, col: 3 }),
                new Piece_1.Griff(PlayerType.LOWER, { row: 4, col: 4 }),
                new Piece_1.Chick(PlayerType.LOWER, { row: 3, col: 1 }),
                new Piece_1.Chick(PlayerType.LOWER, { row: 3, col: 2 }),
                new Piece_1.Chick(PlayerType.LOWER, { row: 3, col: 3 }),
            ];
        }
    }
    getPieces() {
        return this.pieces;
    }
}
exports.Player = Player;
