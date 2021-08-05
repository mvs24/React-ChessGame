import { Piece } from "./Piece";

export class Queen extends Piece {
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

  getTopRightMoves() {
    const topRightMoves: number[][] = [];

    let nextRow = this.row - 1;
    let nextColumn = this.column + 1;

    while (nextRow >= 0 && nextColumn <= 7) {
      topRightMoves.push([nextRow, nextColumn]);
      nextRow--;
      nextColumn++;
    }

    return topRightMoves;
  }

  getTopLeftMoves() {
    const topLeftMoves: number[][] = [];

    let nextRow = this.row - 1;
    let nextColumn = this.column - 1;

    while (nextRow >= 0 && nextColumn >= 0) {
      topLeftMoves.push([nextRow, nextColumn]);
      nextRow--;
      nextColumn--;
    }

    return topLeftMoves;
  }

  getBottomLeftMoves() {
    const bottomLeftMoves: number[][] = [];

    let nextRow = this.row + 1;
    let nextColumn = this.column - 1;

    while (nextRow <= 7 && nextColumn >= 0) {
      bottomLeftMoves.push([nextRow, nextColumn]);
      nextRow++;
      nextColumn--;
    }

    return bottomLeftMoves;
  }

  getBottomRightMoves() {
    const bottomRightMoves: number[][] = [];

    let nextRow = this.row + 1;
    let nextColumn = this.column + 1;

    while (nextRow <= 7 && nextColumn <= 7) {
      bottomRightMoves.push([nextRow, nextColumn]);
      nextRow++;
      nextColumn++;
    }

    return bottomRightMoves;
  }

  getAvailableTopLeftMoves(boardPieces: Piece[][]) {
    const allTopLeftMoves = this.getTopLeftMoves();

    const topLeftAvailableMoves = [];
    for (let i = 0; i < allTopLeftMoves.length; i++) {
      const coordinate = allTopLeftMoves[i];
      if (this.isCoordinateEmpty(coordinate, boardPieces)) {
        topLeftAvailableMoves.push(coordinate);
      } else if (this.isCoordinateTakenByMe(coordinate, boardPieces)) {
        break;
      } else if (this.isCoordinateTakenByOpponent(coordinate, boardPieces)) {
        topLeftAvailableMoves.push(coordinate);
        break;
      }
    }

    return topLeftAvailableMoves;
  }

  getAvailableTopRightMoves(boardPieces: Piece[][]) {
    const allTopRightMoves = this.getTopRightMoves();

    const topRightAvailableMoves = [];
    for (let i = 0; i < allTopRightMoves.length; i++) {
      const coordinate = allTopRightMoves[i];
      if (this.isCoordinateEmpty(coordinate, boardPieces)) {
        topRightAvailableMoves.push(coordinate);
      } else if (this.isCoordinateTakenByMe(coordinate, boardPieces)) {
        break;
      } else if (this.isCoordinateTakenByOpponent(coordinate, boardPieces)) {
        topRightAvailableMoves.push(coordinate);
        break;
      }
    }

    return topRightAvailableMoves;
  }

  getAvailableBottomRightMoves(boardPieces: Piece[][]) {
    const allBottomRightMoves = this.getBottomRightMoves();

    const bottomRightAvailableMoves = [];
    for (let i = 0; i < allBottomRightMoves.length; i++) {
      const coordinate = allBottomRightMoves[i];
      if (this.isCoordinateEmpty(coordinate, boardPieces)) {
        bottomRightAvailableMoves.push(coordinate);
      } else if (this.isCoordinateTakenByMe(coordinate, boardPieces)) {
        break;
      } else if (this.isCoordinateTakenByOpponent(coordinate, boardPieces)) {
        bottomRightAvailableMoves.push(coordinate);
        break;
      }
    }

    return bottomRightAvailableMoves;
  }

  getAvailableBottomLeftMoves(boardPieces: Piece[][]) {
    const allBottomLeftMoves = this.getBottomLeftMoves();

    const bottomLeftAvailableMoves = [];
    for (let i = 0; i < allBottomLeftMoves.length; i++) {
      const coordinate = allBottomLeftMoves[i];
      if (this.isCoordinateEmpty(coordinate, boardPieces)) {
        bottomLeftAvailableMoves.push(coordinate);
      } else if (this.isCoordinateTakenByMe(coordinate, boardPieces)) {
        break;
      } else if (this.isCoordinateTakenByOpponent(coordinate, boardPieces)) {
        bottomLeftAvailableMoves.push(coordinate);
        break;
      }
    }

    return bottomLeftAvailableMoves;
  }

  getAvailableMoves(boardPieces: Piece[][]) {
    return [
      ...this.getAvailableBottomMoves(boardPieces),
      ...this.getAvailableLeftMoves(boardPieces),
      ...this.getAvailableRightMoves(boardPieces),
      ...this.getAvailableTopMoves(boardPieces),
      ...this.getAvailableTopLeftMoves(boardPieces),
      ...this.getAvailableTopRightMoves(boardPieces),
      ...this.getAvailableBottomRightMoves(boardPieces),
      ...this.getAvailableBottomLeftMoves(boardPieces),
    ];
  }
}
