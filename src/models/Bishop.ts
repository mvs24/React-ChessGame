import { Piece } from "./Piece";

export class Bishop extends Piece {
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
      ...this.getAvailableTopLeftMoves(boardPieces),
      ...this.getAvailableTopRightMoves(boardPieces),
      ...this.getAvailableBottomRightMoves(boardPieces),
      ...this.getAvailableBottomLeftMoves(boardPieces),
    ];
  }
}
