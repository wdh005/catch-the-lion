"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Board_1 = require("./Board");
const Piece_1 = require("./Piece");
const Player_1 = require("./Player");
class Game {
    constructor() {
        this.turn = 0;
        this.gameInfoEl = document.querySelector(".alert");
        this.state = "STARTED";
        this.upperPlayer = new Player_1.Player(Player_1.PlayerType.UPPER);
        this.lowerPlayer = new Player_1.Player(Player_1.PlayerType.LOWER);
        this.board = new Board_1.Board(this.upperPlayer, this.lowerPlayer);
        this.upperDeadZone = new Board_1.DeadZone("upper");
        this.lowerDeadZone = new Board_1.DeadZone("lower");
        const boardContainer = document.querySelector(".board-container");
        boardContainer.firstChild.remove();
        boardContainer.appendChild(this.board._el);
        this.currentPlayer = this.upperPlayer;
        this.board.render();
        this.renderInfo();
        this.board._el.addEventListener("click", (e) => {
            if (this.state === "END") {
                return false;
            }
            if (e.target instanceof HTMLElement) {
                let cellEl;
                if (e.target.classList.contains("cell")) {
                    cellEl = e.target;
                }
                else if (e.target.classList.contains("piece")) {
                    cellEl = e.target.parentElement;
                }
                else {
                    return false;
                }
                const cell = this.board.map.get(cellEl);
                if (this.isCurrentUserPiece(cell)) {
                    this.select(cell);
                    return false;
                }
                if (this.selectedCell) {
                    this.move(cell);
                    this.changeTurn();
                }
            }
        });
    }
    isCurrentUserPiece(cell) {
        return (cell != null &&
            cell.getPiece() != null &&
            cell.getPiece().ownerType === this.currentPlayer.type);
    }
    select(cell) {
        if (cell.getPiece() == null) {
            return;
        }
        if (cell.getPiece().ownerType !== this.currentPlayer.type) {
            return;
        }
        if (this.selectedCell) {
            this.selectedCell.deactive();
            this.selectedCell.render();
        }
        this.selectedCell = cell;
        cell.active();
        cell.render();
    }
    move(cell) {
        this.selectedCell.deactive();
        const killed = this.selectedCell
            .getPiece()
            .move(this.selectedCell, cell)
            .getKilled();
        this.selectedCell = cell;
        if (killed) {
            if (killed.ownerType === Player_1.PlayerType.UPPER) {
                this.lowerDeadZone.put(killed);
            }
            else {
                this.upperDeadZone.put(killed);
            }
            if (killed instanceof Piece_1.Lion) {
                this.state = "END";
            }
        }
    }
    renderInfo(extraMessage) {
        this.gameInfoEl.innerHTML = `#${this.turn}턴 ${this.currentPlayer.type} 차레 ${extraMessage ? "| " + extraMessage : ""}`;
    }
    changeTurn() {
        this.selectedCell.deactive();
        this.selectedCell = null;
        if (this.state === "END") {
            this.renderInfo("END!");
        }
        else {
            this.turn += 1;
            this.currentPlayer =
                this.currentPlayer === this.lowerPlayer
                    ? this.upperPlayer
                    : this.lowerPlayer;
            this.renderInfo();
        }
        this.board.render();
    }
}
exports.Game = Game;
