import { Piece } from "./Piece";

export class Pawn extends Piece {
  getTopMoves(boardPieces: Piece[][]) {
    const allMoves = [];

    if (this.color === "white") {
      if (this.row === 6) {
        if (this.isCoordinateEmpty([this.row - 1, this.column], boardPieces))
          allMoves.push([this.row - 1, this.column]);
        if (
          this.isCoordinateEmpty([this.row - 2, this.column], boardPieces) &&
          !this.isCoordinateTakenByMe([this.row - 1, this.column], boardPieces)
        )
          allMoves.push([this.row - 2, this.column]);
      } else {
        if (this.isCoordinateEmpty([this.row - 1, this.column], boardPieces))
          allMoves.push([this.row - 1, this.column]);
      }
    } else {
      if (this.row === 1) {
        if (this.isCoordinateEmpty([this.row + 1, this.column], boardPieces))
          allMoves.push([this.row + 1, this.column]);
        if (
          this.isCoordinateEmpty([this.row + 2, this.column], boardPieces) &&
          !this.isCoordinateTakenByMe([this.row + 1, this.column], boardPieces)
        )
          allMoves.push([this.row + 2, this.column]);
      } else {
        if (this.isCoordinateEmpty([this.row + 1, this.column], boardPieces))
          allMoves.push([this.row + 1, this.column]);
      }
    }

    return allMoves;
  }

  canTakeAtLeftDiagonal(boardPieces: Piece[][]): {
    canTake: boolean;
    coordinateToTake: number[];
  } {
    if (this.color === "white") {
      return {
        canTake: this.isCoordinateTakenByOpponent(
          [this.row - 1, this.column + 1],
          boardPieces
        ),
        coordinateToTake: [this.row - 1, this.column + 1],
      };
    } else {
      return {
        canTake: this.isCoordinateTakenByOpponent(
          [this.row + 1, this.column - 1],
          boardPieces
        ),
        coordinateToTake: [this.row + 1, this.column - 1],
      };
    }
  }

  canTakeAtRightDiagonal(boardPieces: Piece[][]): {
    canTake: boolean;
    coordinateToTake: number[];
  } {
    if (this.color === "white") {
      return {
        canTake: this.isCoordinateTakenByOpponent(
          [this.row - 1, this.column - 1],
          boardPieces
        ),
        coordinateToTake: [this.row - 1, this.column - 1],
      };
    } else {
      return {
        canTake: this.isCoordinateTakenByOpponent(
          [this.row + 1, this.column + 1],
          boardPieces
        ),
        coordinateToTake: [this.row + 1, this.column + 1],
      };
    }
  }

  getAvailableMoves(boardPieces: Piece[][]) {
    const availableMoves = [...this.getTopMoves(boardPieces)];
    const {
      canTake: canTakeAtLeftDiagonal,
      coordinateToTake: coordinateToTakeAtLeftDiagonal,
    } = this.canTakeAtLeftDiagonal(boardPieces);
    const {
      canTake: canTakeAtRightDiagonal,
      coordinateToTake: coordinateToTakeAtRightDiagonal,
    } = this.canTakeAtRightDiagonal(boardPieces);

    if (canTakeAtLeftDiagonal) {
      availableMoves.push(coordinateToTakeAtLeftDiagonal);
    }
    if (canTakeAtRightDiagonal) {
      availableMoves.push(coordinateToTakeAtRightDiagonal);
    }

    return availableMoves;
  }
}
