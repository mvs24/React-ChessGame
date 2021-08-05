import { Piece } from "./Piece";

export class Knight extends Piece {
  getAvailableMoves(boardPieces: Piece[][]) {
    const availableMoves: number[][] = [];

    if (this.row + 2 <= 7 && this.column - 1 >= 0) {
      if (this.isValidMove([this.row + 2, this.column - 1], boardPieces))
        availableMoves.push([this.row + 2, this.column - 1]);
    }
    if (this.row + 1 <= 7 && this.column - 2 >= 0) {
      if (this.isValidMove([this.row + 1, this.column - 2], boardPieces))
        availableMoves.push([this.row + 1, this.column - 2]);
    }
    if (this.row - 1 >= 0 && this.column - 2 >= 0) {
      if (this.isValidMove([this.row - 1, this.column - 2], boardPieces))
        availableMoves.push([this.row - 1, this.column - 2]);
    }
    if (this.row - 2 >= 0 && this.column - 1 >= 0) {
      if (this.isValidMove([this.row - 2, this.column - 1], boardPieces))
        availableMoves.push([this.row - 2, this.column - 1]);
    }
    if (this.row + 2 <= 7 && this.column + 1 <= 7) {
      if (this.isValidMove([this.row + 2, this.column + 1], boardPieces))
        availableMoves.push([this.row + 2, this.column + 1]);
    }
    if (this.row + 1 <= 7 && this.column + 2 <= 7) {
      if (this.isValidMove([this.row + 1, this.column + 2], boardPieces))
        availableMoves.push([this.row + 1, this.column + 2]);
    }
    if (this.row - 1 >= 0 && this.column + 2 <= 7) {
      if (this.isValidMove([this.row - 1, this.column + 2], boardPieces))
        availableMoves.push([this.row - 1, this.column + 2]);
    }
    if (this.row - 2 >= 0 && this.column + 1 <= 7) {
      if (this.isValidMove([this.row - 2, this.column + 1], boardPieces))
        availableMoves.push([this.row - 2, this.column + 1]);
    }

    return availableMoves;
  }
}
