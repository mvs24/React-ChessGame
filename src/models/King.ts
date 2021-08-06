import { Piece } from "./Piece";

export class King extends Piece {
  public moved: boolean = false;

  markKingAsMoved() {
    this.moved = true;
  }

  isKingCastlingActive(boardPieces: Piece[][]): boolean {
    return (
      !this.moved &&
      this.isCoordinateEmpty([this.row, this.column + 1], boardPieces) &&
      this.isCoordinateEmpty([this.row, this.column + 2], boardPieces) &&
      !this.isCandidateCoordinateAttackedByAnyOpponentPieces(
        [this.row, this.column + 2],
        boardPieces
      )
      // && need to do the same for rook
    );
  }

  isQueenCastlingActive(boardPieces: Piece[][]): boolean {
    return (
      !this.moved &&
      this.isCoordinateEmpty([this.row, this.column - 1], boardPieces) &&
      this.isCoordinateEmpty([this.row, this.column - 2], boardPieces) &&
      !this.isCandidateCoordinateAttackedByAnyOpponentPieces(
        [this.row, this.column - 2],
        boardPieces
      )
      // && need to do the same for rook
    );
  }

  getKingCastlingMove(boardPieces: Piece[][]) {
    if (this.isKingCastlingActive(boardPieces))
      return [this.row, this.column + 2];

    return [];
  }

  getQueenCastingMove(boardPieces: Piece[][]) {
    if (this.isQueenCastlingActive(boardPieces))
      return [this.row, this.column - 2];

    return [];
  }

  isCandidateCoordinateAttackedByAnyOpponentPieces(
    candidateCoordinate: number[],
    boardPieces: Piece[][]
  ): boolean {
    // TODO: BUG WITH PAWN -> CAN TAKE ON DIAGONAL BUT GETAVAILABLEMOVES DO NOT TAKE THAT IN CONSIDERATION -> DO IT MANUALLY
    if (this.color === "white") {
      const blackPieces = this.getBlackPieces(boardPieces);
      let allBlackPiecesAvailableMoves: number[][] = [];

      blackPieces.forEach((blackPiece: Piece) => {
        if (blackPiece instanceof King) return;

        allBlackPiecesAvailableMoves = allBlackPiecesAvailableMoves.concat(
          blackPiece.getAvailableMoves(boardPieces)
        );
      });

      return allBlackPiecesAvailableMoves.some(
        (coordinate: number[]) =>
          coordinate[0] === candidateCoordinate[0] &&
          coordinate[1] === candidateCoordinate[1]
      );
    } else {
      const whitePieces = this.getWhitePieces(boardPieces);
      let allWhitePiecesAvailableMoves: number[][] = [];
      whitePieces.forEach((whitePiece: Piece) => {
        if (whitePiece instanceof King) return;
        allWhitePiecesAvailableMoves = allWhitePiecesAvailableMoves.concat(
          whitePiece.getAvailableMoves(boardPieces)
        );
      });

      return allWhitePiecesAvailableMoves.some(
        (coordinate: number[]) =>
          coordinate[0] === candidateCoordinate[0] &&
          coordinate[1] === candidateCoordinate[1]
      );
    }
  }

  getAvailableMoves(boardPieces: Piece[][]) {
    const kingCastlingMove = this.getKingCastlingMove(boardPieces);
    const queenCastlingMove = this.getQueenCastingMove(boardPieces);

    const availableMoves = [kingCastlingMove, queenCastlingMove];
    const candidateCoordinates = [
      [this.row + 1, this.column],
      [this.row - 1, this.column],
      [this.row, this.column + 1],
      [this.row, this.column - 1],
      [this.row + 1, this.column + 1],
      [this.row + 1, this.column - 1],
      [this.row - 1, this.column + 1],
      [this.row - 1, this.column - 1],
    ];

    candidateCoordinates.forEach((candidateCoordinate: number[]) => {
      if (
        candidateCoordinate[0] >= 0 &&
        candidateCoordinate[0] <= 7 &&
        candidateCoordinate[1] >= 0 &&
        candidateCoordinate[1] <= 7 &&
        !this.isCoordinateTakenByMe(candidateCoordinate, boardPieces)
      ) {
        if (
          (this.isCoordinateEmpty(candidateCoordinate, boardPieces) &&
            !this.isCandidateCoordinateAttackedByAnyOpponentPieces(
              candidateCoordinate,
              boardPieces
            )) ||
          (this.isCoordinateTakenByOpponent(candidateCoordinate, boardPieces) &&
            !this.isCandidateCoordinateAttackedByAnyOpponentPieces(
              candidateCoordinate,
              boardPieces
            ))
        ) {
          availableMoves.push(candidateCoordinate);
        }
      }
    });

    return availableMoves;
  }
}
