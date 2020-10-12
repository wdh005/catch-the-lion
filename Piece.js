"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chick = exports.Griff = exports.Elephant = exports.Lion = exports.MoveResult = void 0;
const Player_1 = require("./Player");
const lion_png_1 = __importDefault(require("./images/lion.png"));
const chicken_png_1 = __importDefault(require("./images/chicken.png"));
const griff_png_1 = __importDefault(require("./images/griff.png"));
const elophant_png_1 = __importDefault(require("./images/elophant.png"));
class MoveResult {
    constructor(killedPiece) {
        this.killedPiece = killedPiece;
    }
    //잡은 말들을 반환해 준다.
    getKilled() {
        return this.killedPiece;
    }
}
exports.MoveResult = MoveResult;
class DefaultPiece {
    constructor(ownerType, currentPosition) {
        this.ownerType = ownerType;
        this.currentPosition = currentPosition;
    }
    move(from, to) {
        if (!this.canMove(to.position)) {
            throw new Error("can no move!!");
        }
        const moveResult = new MoveResult(to.getPiece() != null ? to.getPiece() : null);
        to.put(this);
        from.put(null);
        this.currentPosition = to.position;
        return moveResult;
    }
}
class Lion extends DefaultPiece {
    canMove(pos) {
        const canMove = (pos.row === this.currentPosition.row + 1 &&
            pos.col === this.currentPosition.col) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col) ||
            (pos.col === this.currentPosition.col + 1 &&
                pos.row === this.currentPosition.row) ||
            (pos.col === this.currentPosition.col - 1 &&
                pos.row === this.currentPosition.row) ||
            (pos.row === this.currentPosition.row + 1 &&
                pos.col === this.currentPosition.col + 1) ||
            (pos.row === this.currentPosition.row + 1 &&
                pos.col === this.currentPosition.col - 1) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col + 1) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col - 1);
        return canMove;
    }
    render() {
        return `<img class="piece ${this.ownerType}" src="${lion_png_1.default}" width="90%" height="90%"/>`;
    }
}
exports.Lion = Lion;
class Elephant extends DefaultPiece {
    canMove(pos) {
        return ((pos.row === this.currentPosition.row + 1 &&
            pos.col === this.currentPosition.col + 1) ||
            (pos.row === this.currentPosition.row + 1 &&
                pos.col === this.currentPosition.col - 1) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col + 1) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col - 1));
    }
    render() {
        return `<img class="piece ${this.ownerType}" src="${elophant_png_1.default}" width="90%" height="90%"/>`;
    }
}
exports.Elephant = Elephant;
class Griff extends DefaultPiece {
    canMove(pos) {
        return ((pos.row === this.currentPosition.row + 1 &&
            pos.col === this.currentPosition.col) ||
            (pos.row === this.currentPosition.row - 1 &&
                pos.col === this.currentPosition.col) ||
            (pos.col === this.currentPosition.col + 1 &&
                pos.row === this.currentPosition.row) ||
            (pos.col === this.currentPosition.col - 1 &&
                pos.row === this.currentPosition.row));
    }
    render() {
        return `<img class="piece ${this.ownerType}" src="${griff_png_1.default}" width="90%" height="90%"/>`;
    }
}
exports.Griff = Griff;
class Chick extends DefaultPiece {
    canMove(pos) {
        return (this.currentPosition.row +
            (this.ownerType == Player_1.PlayerType.UPPER ? +1 : -1) ===
            pos.row);
    }
    render() {
        return `<img class="piece ${this.ownerType}" src="${chicken_png_1.default}" width="90%" height="90%"/>`;
    }
}
exports.Chick = Chick;
