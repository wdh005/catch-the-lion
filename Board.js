"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadZone = exports.Board = exports.Cell = void 0;
class Cell {
    constructor(position, piece) {
        this.position = position;
        this.piece = piece;
        this.isActive = false;
        this._el = document.createElement("div");
        this._el.classList.add("cell");
    }
    put(piece) {
        this.piece = piece;
    }
    getPiece() {
        return this.piece;
    }
    active() {
        this.isActive = true;
    }
    deactive() {
        this.isActive = false;
    }
    render() {
        if (this.isActive) {
            this._el.classList.add("active");
        }
        else {
            this._el.classList.remove("active");
        }
        this._el.innerHTML = this.piece ? this.piece.render() : "";
    }
}
exports.Cell = Cell;
// 보트판 구현 (보드판 = 셀들의 집합)
class Board {
    constructor(upperPlayer, lowerPlayer) {
        this.cells = [];
        this._el = document.createElement("div");
        this.map = new WeakMap();
        this._el.className = "board";
        for (let row = 0; row < 5; row++) {
            const rowEl = document.createElement("div");
            rowEl.className = "row";
            this._el.appendChild(rowEl);
            for (let col = 0; col < 5; col++) {
                const piece = upperPlayer.getPieces().find(({ currentPosition }) => {
                    return (currentPosition.col === col &&
                        currentPosition.row === row);
                }) ||
                    lowerPlayer.getPieces().find(({ currentPosition }) => {
                        return (currentPosition.col === col &&
                            currentPosition.row === row);
                    });
                const cell = new Cell({ row, col }, piece);
                this.map.set(cell._el, cell);
                this.cells.push(cell);
                rowEl.appendChild(cell._el);
            }
        }
    }
    render() {
        this.cells.forEach((v) => v.render());
    }
}
exports.Board = Board;
//잡힌 말들 영역
class DeadZone {
    constructor(type) {
        this.type = type;
        this.cells = [];
        this.deadzoneEl = document
            .getElementById(`${this.type}_deadzone`)
            .querySelector(".card-body");
        for (let col = 0; col < 8; col++) {
            const cell = new Cell({ col, row: 0 }, null);
            this.cells.push(cell);
            this.deadzoneEl.appendChild(cell._el);
        }
    }
    put(piece) {
        const emptyCell = this.cells.find((v) => v.getPiece() == null);
        emptyCell.put(piece);
        emptyCell.render();
    }
    render() {
        this.cells.forEach((v) => v.render());
    }
}
exports.DeadZone = DeadZone;
