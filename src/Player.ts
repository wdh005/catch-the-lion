import { Chick, Elephant, Griff, Lion, Piece } from "./Piece";

export enum PlayerType {
    UPPER = "UPPER",
    LOWER = "LOWER",
}

export class Player {
    private pieces: Piece[];

    getPieces() {
        return this.pieces;
    }
    constructor(public readonly type: PlayerType) {
        if (type === PlayerType.UPPER) {
            this.pieces = [
                new Griff(PlayerType.UPPER, { row: 0, col: 0 }),
                new Elephant(PlayerType.UPPER, { row: 0, col: 1 }),
                new Lion(PlayerType.UPPER, { row: 0, col: 2 }),
                new Elephant(PlayerType.UPPER, { row: 0, col: 3 }),
                new Griff(PlayerType.UPPER, { row: 0, col: 4 }),
                new Chick(PlayerType.UPPER, { row: 1, col: 1 }),
                new Chick(PlayerType.UPPER, { row: 1, col: 2 }),
                new Chick(PlayerType.UPPER, { row: 1, col: 3 }),
            ];
        } else {
            this.pieces = [
                new Griff(PlayerType.LOWER, { row: 4, col: 0 }),
                new Elephant(PlayerType.LOWER, { row: 4, col: 1 }),
                new Lion(PlayerType.LOWER, { row: 4, col: 2 }),
                new Elephant(PlayerType.LOWER, { row: 4, col: 3 }),
                new Griff(PlayerType.LOWER, { row: 4, col: 4 }),
                new Chick(PlayerType.LOWER, { row: 3, col: 1 }),
                new Chick(PlayerType.LOWER, { row: 3, col: 2 }),
                new Chick(PlayerType.LOWER, { row: 3, col: 3 }),
            ];
        }
    }
}
