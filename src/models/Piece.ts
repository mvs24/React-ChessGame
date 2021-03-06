export abstract class Piece {
  public captured = false;
  public row: number;
  public column: number;
  abstract getAvailableMoves(boardPieces: Piece[][]): number[][];

  constructor(
    public coordinates: number[],
    public markup: string,
    public color: "white" | "black"
  ) {
    this.row = this.coordinates[0];
    this.column = this.coordinates[1];
  }

  setRowAndColumn() {
    this.row = this.coordinates[0];
    this.column = this.coordinates[1];
  }

  capturePiece() {
    this.captured = true;
  }

  setCoordinates(coordinates: number[]) {
    this.coordinates = coordinates;
    this.setRowAndColumn();
  }

  getWhitePieces(boardPieces: Piece[][]) {
    const whitePieces: Piece[] = [];

    for (let i = 0; i < boardPieces.length; i++) {
      for (let j = 0; j < boardPieces[i].length; j++) {
        if (boardPieces[i][j] && boardPieces[i][j].color === "white") {
          whitePieces.push(boardPieces[i][j]);
        }
      }
    }

    return whitePieces;
  }

  getBlackPieces(boardPieces: Piece[][]) {
    const blackPieces: Piece[] = [];

    for (let i = 0; i < boardPieces.length; i++) {
      for (let j = 0; j < boardPieces[i].length; j++) {
        if (boardPieces[i][j] && boardPieces[i][j].color === "black") {
          blackPieces.push(boardPieces[i][j]);
        }
      }
    }

    return blackPieces;
  }

  getWhitePiecesCoordinates(boardPieces: Piece[][]) {
    const whitePiecesCoordinates: number[][] = [];

    for (let i = 0; i < boardPieces.length; i++) {
      for (let j = 0; j < boardPieces[i].length; j++) {
        if (boardPieces[i][j] && boardPieces[i][j].color === "white") {
          whitePiecesCoordinates.push([i, j]);
        }
      }
    }

    return whitePiecesCoordinates;
  }

  getBlackPiecesCoordinates(boardPieces: Piece[][]) {
    const blackPiecesCoordinates: number[][] = [];

    for (let i = 0; i < boardPieces.length; i++) {
      for (let j = 0; j < boardPieces[i].length; j++) {
        if (boardPieces[i][j] && boardPieces[i][j].color === "black") {
          blackPiecesCoordinates.push([i, j]);
        }
      }
    }

    return blackPiecesCoordinates;
  }

  isValidMove(candidateCoordinates: number[], boardPieces: Piece[][]) {
    if (this.color === "white") {
      const whitePiecesCoordinates: number[][] =
        this.getWhitePiecesCoordinates(boardPieces);

      return !whitePiecesCoordinates.some(
        (coordinate: number[]) =>
          coordinate[0] === candidateCoordinates[0] &&
          coordinate[1] === candidateCoordinates[1]
      );
    } else {
      const blackPiecesCoordinates: number[][] =
        this.getBlackPiecesCoordinates(boardPieces);

      return !blackPiecesCoordinates.some(
        (coordinate: number[]) =>
          coordinate[0] === candidateCoordinates[0] &&
          coordinate[1] === candidateCoordinates[1]
      );
    }
  }

  isCoordinateEmpty(coordinate: number[], boardPieces: Piece[][]) {
    const allPiecesCoordinates = [
      ...this.getWhitePiecesCoordinates(boardPieces),
      ...this.getBlackPiecesCoordinates(boardPieces),
    ];

    return !allPiecesCoordinates.some(
      (pieceCoordinate: number[]) =>
        pieceCoordinate[0] === coordinate[0] &&
        pieceCoordinate[1] === coordinate[1]
    );
  }

  isCoordinateTakenByOpponent(
    coordinate: number[],
    boardPieces: Piece[][]
  ): boolean {
    if (this.color === "white") {
      const blackPiecesCoordinates =
        this.getBlackPiecesCoordinates(boardPieces);

      return blackPiecesCoordinates.some(
        (blackPieceCoordinate: number[]) =>
          blackPieceCoordinate[0] === coordinate[0] &&
          blackPieceCoordinate[1] === coordinate[1]
      );
    } else {
      const whitePiecesCoordinates =
        this.getWhitePiecesCoordinates(boardPieces);

      return whitePiecesCoordinates.some(
        (whitePieceCoordinate: number[]) =>
          whitePieceCoordinate[0] === coordinate[0] &&
          whitePieceCoordinate[1] === coordinate[1]
      );
    }
  }

  isCoordinateTakenByMe(coordinate: number[], boardPieces: Piece[][]): boolean {
    if (this.color === "white") {
      const whitePiecesCoordinates =
        this.getWhitePiecesCoordinates(boardPieces);

      return whitePiecesCoordinates.some(
        (whitePieceCoordinate: number[]) =>
          whitePieceCoordinate[0] === coordinate[0] &&
          whitePieceCoordinate[1] === coordinate[1]
      );
    } else {
      const blackPiecesCoordinates =
        this.getBlackPiecesCoordinates(boardPieces);

      return blackPiecesCoordinates.some(
        (blackPieceCoordinate: number[]) =>
          blackPieceCoordinate[0] === coordinate[0] &&
          blackPieceCoordinate[1] === coordinate[1]
      );
    }
  }
}
