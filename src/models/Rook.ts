import { Piece } from "./Piece";

export class Rook extends Piece {
  getTopMoves() {
    const topMoves = [];

    for (let row = this.row - 1; row >= 0; row--) {
      topMoves.push([row, this.column]);
    }

    return topMoves;
  }

  getBottomMoves() {
    const bottomMoves = [];

    for (let row = this.row + 1; row <= 7; row++) {
      bottomMoves.push([row, this.column]);
    }

    return bottomMoves;
  }

  getLeftMoves() {
    const leftMoves = [];

    for (let column = this.column - 1; column >= 0; column--) {
      leftMoves.push([this.row, column]);
    }

    return leftMoves;
  }

  getRightMoves() {
    const rightMoves = [];

    for (let column = this.column + 1; column <= 7; column++) {
      rightMoves.push([this.row, column]);
    }

    return rightMoves;
  }

  getAvailableTopMoves(boardPieces: Piece[][]) {
    const availableTopMoves = [];

    for (let i = this.row - 1; i >= 0; i--) {
      if (this.isCoordinateEmpty([i, this.column], boardPieces)) {
        availableTopMoves.push([i, this.column]);
      } else if (this.isCoordinateTakenByMe([i, this.column], boardPieces)) {
        break;
      } else if (
        this.isCoordinateTakenByOpponent([i, this.column], boardPieces)
      ) {
        availableTopMoves.push([i, this.column]);
        break;
      }
    }

    return availableTopMoves;
  }

  getAvailableBottomMoves(boardPieces: Piece[][]) {
    const availableBottomMoves = [];

    for (let i = this.row + 1; i <= 7; i++) {
      if (this.isCoordinateEmpty([i, this.column], boardPieces)) {
        availableBottomMoves.push([i, this.column]);
      } else if (this.isCoordinateTakenByMe([i, this.column], boardPieces)) {
        break;
      } else if (
        this.isCoordinateTakenByOpponent([i, this.column], boardPieces)
      ) {
        availableBottomMoves.push([i, this.column]);
        break;
      }
    }

    return availableBottomMoves;
  }

  getAvailableLeftMoves(boardPieces: Piece[][]) {
    const availableLeftMoves = [];

    for (let column = this.column - 1; column >= 0; column--) {
      if (this.isCoordinateEmpty([this.row, column], boardPieces)) {
        availableLeftMoves.push([this.row, column]);
      } else if (this.isCoordinateTakenByMe([this.row, column], boardPieces)) {
        break;
      } else if (
        this.isCoordinateTakenByOpponent([this.row, column], boardPieces)
      ) {
        availableLeftMoves.push([this.row, column]);
        break;
      }
    }

    return availableLeftMoves;
  }

  getAvailableRightMoves(boardPieces: Piece[][]) {
    const availableRightMoves = [];

    for (let column = this.column + 1; column <= 7; column++) {
      if (this.isCoordinateEmpty([this.row, column], boardPieces)) {
        availableRightMoves.push([this.row, column]);
      } else if (this.isCoordinateTakenByMe([this.row, column], boardPieces)) {
        break;
      } else if (
        this.isCoordinateTakenByOpponent([this.row, column], boardPieces)
      ) {
        availableRightMoves.push([this.row, column]);
        break;
      }
    }

    return availableRightMoves;
  }

  getAvailableMoves(boardPieces: Piece[][]) {
    return [
      ...this.getAvailableBottomMoves(boardPieces),
      ...this.getAvailableLeftMoves(boardPieces),
      ...this.getAvailableRightMoves(boardPieces),
      ...this.getAvailableTopMoves(boardPieces),
    ];
  }
}
