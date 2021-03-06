import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { piecesString } from "./base";
import { Bishop } from "./models/Bishop";
import { King } from "./models/King";
import { Knight } from "./models/Knight";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";
import { Queen } from "./models/Queen";
import { Rook } from "./models/Rook";
import Square from "./Square";

const whiteKingPiece = new King([7, 4], piecesString.whiteKing, "white");
const blackKingPiece = new King([0, 4], piecesString.blackKing, "black");

const generatePieces = () => {
  const board: Piece[][] = new Array(8).fill(0).map(() => []);
  for (let i = 0; i < 8; i++) {
    board[1].push(new Pawn([1, i], piecesString.blackPawn, "black"));
    board[6].push(new Pawn([6, i], piecesString.whitePawn, "white"));
  }

  board[0][0] = new Rook([0, 0], piecesString.blackRook, "black");
  board[0][7] = new Rook([0, 7], piecesString.blackRook, "black");
  board[0][1] = new Knight([0, 1], piecesString.blackKnight, "black");
  board[0][6] = new Knight([0, 6], piecesString.blackKnight, "black");
  board[0][2] = new Bishop([0, 2], piecesString.blackBishop, "black");
  board[0][5] = new Bishop([0, 5], piecesString.blackBishop, "black");
  board[0][3] = new Queen([0, 3], piecesString.blackQueen, "black");
  board[0][4] = blackKingPiece;

  board[7][0] = new Rook([7, 0], piecesString.whiteRook, "white");
  board[7][7] = new Rook([7, 7], piecesString.whiteRook, "white");
  board[7][1] = new Knight([7, 1], piecesString.whiteKnight, "white");
  board[7][6] = new Knight([7, 6], piecesString.whiteKnight, "white");
  board[7][2] = new Bishop([7, 2], piecesString.whiteBishop, "white");
  board[7][5] = new Bishop([7, 5], piecesString.whiteBishop, "white");
  board[7][3] = new Queen([7, 3], piecesString.whiteQueen, "white");
  board[7][4] = whiteKingPiece;

  for (let j = 2; j < 6; j++) board[j] = new Array(8).fill(undefined);

  return board;
};

const getSquareColor: (row: number, col: number) => "white" | "black" = (
  row: number,
  col: number
) => {
  if (row % 2 === 0 && col % 2 === 0) {
    return "white";
  }
  if (row % 2 === 0 && col % 2 !== 0) {
    return "black";
  }
  if (row % 2 !== 0 && col % 2 === 0) {
    return "black";
  }
  if (row % 2 !== 0 && col % 2 !== 0) {
    return "white";
  }

  return "white";
};

function App() {
  const allPieces = useMemo(() => generatePieces(), []);
  const [boardPieces, setBoardPieces] = useState<Piece[][]>(allPieces);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(
    undefined
  );
  const [availableMoves, setAvailableMoves] = useState<number[][] | undefined>(
    undefined
  );
  const [checkMode, setCheckMode] = useState<{
    whiteKing: boolean;
    blackKing: boolean;
    checkModeCoordinate: undefined | number[];
  }>({
    whiteKing: false,
    blackKing: false,
    checkModeCoordinate: undefined,
  });
  const [whiteKing, setWhiteKing] = useState<Piece>(allPieces[7][4]);
  const [blackKing, setBlackKing] = useState<Piece>(allPieces[0][4]);
  const [lastPieceMoved, setLastPieceMoved] = useState<Piece | undefined>(
    undefined
  );
  const [winner, setWinner] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);

  const controlIfKingWasMoved = useCallback(() => {
    for (let i = 0; i < boardPieces.length; i++) {
      for (let j = 0; j < boardPieces[i].length; j++) {
        if (
          boardPieces[i][j] === whiteKingPiece &&
          boardPieces[i][j].row !== whiteKing.row &&
          boardPieces[i][j].column !== whiteKing.column
        ) {
          setWhiteKing(boardPieces[i][j]);
        } else if (
          boardPieces[i][j] === blackKingPiece &&
          boardPieces[i][j].row !== blackKing.row &&
          boardPieces[i][j].column !== blackKing.column
        ) {
          setBlackKing(boardPieces[i][j]);
        }
      }
    }
  }, [boardPieces, blackKing, whiteKing]);

  useEffect(controlIfKingWasMoved, [controlIfKingWasMoved]);

  const isAvailableMove = useCallback(
    (row: number, column: number) => {
      if (!availableMoves) return false;

      return availableMoves.some(
        (move) => move[0] === row && move[1] === column
      );
    },
    [availableMoves]
  );

  const isValidSelectedPiece = useCallback(
    (selectedPiece: Piece) => {
      if (selectedPiece === undefined) return true;

      if (turn === "white") {
        return selectedPiece.color === "white";
      } else {
        return selectedPiece.color === "black";
      }
    },
    [turn]
  );

  const changeTurn = useCallback(() => {
    setTurn(turn === "white" ? "black" : "white");
  }, [turn]);

  const updateCheckMode = useCallback(() => {
    const kingInCheckModeColor = turn === "black" ? "white" : "black";
    if (kingInCheckModeColor === "white") {
      setCheckMode({
        whiteKing: true,
        blackKing: false,
        checkModeCoordinate: [whiteKing.row, whiteKing.column],
      });
    } else {
      setCheckMode({
        whiteKing: false,
        blackKing: true,
        checkModeCoordinate: [blackKing.row, blackKing.column],
      });
    }
  }, [turn, whiteKing, blackKing]);

  const isCheckMode = useCallback(
    (attackingPiece: Piece): boolean => {
      const nextAvailableMovesForAttackingPiece =
        attackingPiece.getAvailableMoves(boardPieces);

      if (turn === "white") {
        return nextAvailableMovesForAttackingPiece.some(
          (coordinate: number[]) => {
            return (
              coordinate[0] === blackKing.row &&
              coordinate[1] === blackKing.column
            );
          }
        );
      } else {
        return nextAvailableMovesForAttackingPiece.some(
          (coordinate: number[]) => {
            return (
              coordinate[0] === whiteKing.row &&
              coordinate[1] === whiteKing.column
            );
          }
        );
      }
    },
    [boardPieces, turn, blackKing, whiteKing]
  );

  const isKingCastleMove = (
    currentKingColumn: number,
    nextColumn: number
  ): boolean => {
    return nextColumn - currentKingColumn === 2;
  };

  const isQueenCastleMove = (currentKingColumn: number, nextColumn: number) => {
    return currentKingColumn - nextColumn === 2;
  };

  const onAvailableSquareClick = useCallback(
    (coordinates: number[]) => {
      if (!selectedPiece) return;

      const [nextRow, nextColumn] = coordinates;

      if (!isAvailableMove(nextRow, nextColumn)) return;

      const selectedPieceRow = selectedPiece.row;
      const selectedPieceColumn = selectedPiece.column;
      const updatedBoardPieces = [...boardPieces];

      if (selectedPiece instanceof King) {
        if (isKingCastleMove(selectedPiece.column, nextColumn)) {
          // @ts-ignore
          updatedBoardPieces[selectedPieceRow][selectedPieceColumn + 3] =
            undefined;
          updatedBoardPieces[selectedPieceRow][selectedPieceColumn + 1] =
            new Rook(
              [selectedPieceRow, selectedPieceColumn + 1],
              turn === "white"
                ? piecesString.whiteRook
                : piecesString.blackRook,
              turn
            );
        } else if (isQueenCastleMove(selectedPiece.column, nextColumn)) {
          // @ts-ignore
          updatedBoardPieces[selectedPieceRow][selectedPieceColumn - 4] =
            undefined;
          updatedBoardPieces[selectedPieceRow][selectedPieceColumn - 1] =
            new Rook(
              [selectedPieceRow, selectedPieceColumn - 1],
              turn === "white"
                ? piecesString.whiteRook
                : piecesString.blackRook,
              turn
            );
        }
        selectedPiece.markKingAsMoved();
      }

      // @ts-ignore
      updatedBoardPieces[selectedPieceRow][selectedPieceColumn] = undefined;
      updatedBoardPieces[nextRow][nextColumn] = selectedPiece;

      selectedPiece.setCoordinates([nextRow, nextColumn]);

      if (isCheckMode(selectedPiece)) {
        updateCheckMode();
        if (isCheckMate(updatedBoardPieces)) {
          setWinner(true);
          setTimeout(() => {
            alert(`Player ${turn} won the game`);
          });
        }
      }

      setLastPieceMoved(selectedPiece);
      setBoardPieces(updatedBoardPieces);
      setAvailableMoves(undefined);
      setSelectedPiece(undefined);
      changeTurn();

      if (isInCheckMode() && selectedPiece instanceof King) {
        setCheckMode({
          whiteKing: false,
          blackKing: false,
          checkModeCoordinate: undefined,
        });
      }
    },
    [
      isAvailableMove,
      selectedPiece,
      boardPieces,
      changeTurn,
      updateCheckMode,
      isCheckMode,
      turn,
    ]
  );

  const isAttackingMove = useCallback(
    (nextCoordinate: number[]) => {
      if (
        (turn === "white" &&
          boardPieces[nextCoordinate[0]][nextCoordinate[1]].color ===
            "black") ||
        (turn === "black" &&
          boardPieces[nextCoordinate[0]][nextCoordinate[1]].color === "white")
      ) {
        return true;
      }

      return false;
    },
    [turn, boardPieces]
  );

  const attackOponentPiece = useCallback(
    (oponentPieceCoordinates: number[], attackingPiece: Piece) => {
      const updatedBoardPieces = [...boardPieces];
      updatedBoardPieces[oponentPieceCoordinates[0]][
        oponentPieceCoordinates[1]
      ] = attackingPiece;
      // @ts-ignore
      updatedBoardPieces[attackingPiece.row][attackingPiece.column] = undefined;

      attackingPiece.setCoordinates([
        oponentPieceCoordinates[0],
        oponentPieceCoordinates[1],
      ]);

      if (isCheckMode(attackingPiece)) {
        updateCheckMode();
      }

      setLastPieceMoved(attackingPiece);
      setBoardPieces(updatedBoardPieces);
      setAvailableMoves(undefined);
      setSelectedPiece(undefined);
      changeTurn();
    },
    [boardPieces, changeTurn, isCheckMode, updateCheckMode]
  );

  const isInCheckMode = () => {
    if (turn === "white") {
      return checkMode.whiteKing;
    }
    return checkMode.blackKing;
  };

  const isCheckMate = function (boardPieces: Piece[][]) {
    if (turn === "white") {
      return blackKingPiece.getAvailableMoves(boardPieces).length === 0;
    } else {
      return whiteKingPiece.getAvailableMoves(boardPieces).length === 0;
    }
  };

  const updateAvailableMovesOnCheckMode = (newSelectedPiece: Piece) => {
    if (!lastPieceMoved) return;
    const [lastPieceMovedRow, lastPieceMovedColumn] =
      lastPieceMoved.coordinates;

    const turnPieces: Piece[] = [];

    for (let row = 0; row < boardPieces.length; row++) {
      for (let column = 0; column < boardPieces[row].length; column++) {
        if (boardPieces[row][column]?.color === turn) {
          turnPieces.push(boardPieces[row][column]);
        }
      }
    }

    const activePiecesWhoCanMoveOnCheckMode: Piece[] = [];
    if (turn === "white") {
      activePiecesWhoCanMoveOnCheckMode.push(whiteKingPiece);
    } else {
      activePiecesWhoCanMoveOnCheckMode.push(blackKingPiece);
    }

    turnPieces.forEach((piece: Piece) => {
      const pieceAvailableMoves = piece.getAvailableMoves(boardPieces);
      if (
        pieceAvailableMoves.some((coordinate: number[]) => {
          return (
            coordinate[0] === lastPieceMovedRow &&
            coordinate[1] === lastPieceMovedColumn
          );
        })
      ) {
        activePiecesWhoCanMoveOnCheckMode.push(piece);
      }
    });

    if (
      activePiecesWhoCanMoveOnCheckMode.some(
        (piece: Piece) => piece === newSelectedPiece
      )
    ) {
      if (isValidSelectedPiece(newSelectedPiece)) {
        setSelectedPiece(newSelectedPiece);

        let availableMoves = newSelectedPiece.getAvailableMoves(boardPieces);

        if (newSelectedPiece instanceof King === false) {
          availableMoves = availableMoves.filter((coordinate: number[]) => {
            return (
              coordinate[0] === lastPieceMoved.row &&
              coordinate[1] === lastPieceMoved.column
            );
          });
        }

        setAvailableMoves(availableMoves);
      }
    }
  };

  const onSquareClick = useCallback(
    (coordinates: number[]) => {
      if (winner) return;

      const [row, column] = coordinates;
      const newSelectedPiece = boardPieces[row][column];
      let isUnderCheckModeMove = false;

      if (isInCheckMode()) {
        isUnderCheckModeMove = true;

        updateAvailableMovesOnCheckMode(newSelectedPiece);
      }

      if (isUnderCheckModeMove) {
        if (
          isAttackingMove([row, column]) &&
          lastPieceMoved &&
          selectedPiece &&
          isAvailableMove(row, column)
        ) {
          attackOponentPiece([row, column], selectedPiece);
          setCheckMode({
            whiteKing: false,
            blackKing: false,
            checkModeCoordinate: undefined,
          });
          return;
        } else if (newSelectedPiece instanceof King) {
          return;
        }
      } else {
        if (
          isAttackingMove([row, column]) &&
          selectedPiece &&
          isAvailableMove(row, column)
        ) {
          attackOponentPiece([row, column], selectedPiece);
          return;
        }

        if (isValidSelectedPiece(newSelectedPiece)) {
          setSelectedPiece(newSelectedPiece);

          const availableMoves =
            newSelectedPiece.getAvailableMoves(boardPieces);
          setAvailableMoves(availableMoves);
        } else {
          setTimeout(() => {
            alert("Not access for that piece");
          });
        }
      }
    },
    [
      isAvailableMove,
      boardPieces,
      isValidSelectedPiece,
      selectedPiece,
      attackOponentPiece,
      isAttackingMove,
      checkMode,
    ]
  );

  const renderBoard = useCallback(() => {
    const boardToRender: { coordinates: number[]; Element: React.FC }[] = [];

    for (let row = 0; row < boardPieces.length; row++) {
      for (let col = 0; col < boardPieces[row].length; col++) {
        boardToRender.push({
          coordinates: [row, col],
          Element: () => (
            <Square
              checkMode={
                checkMode.checkModeCoordinate
                  ? checkMode.checkModeCoordinate[0] === row &&
                    checkMode.checkModeCoordinate[1] === col
                  : false
              }
              onAvailableSquareClick={(coordinates: number[]) =>
                boardPieces[row][col] === undefined
                  ? onAvailableSquareClick(coordinates)
                  : undefined
              }
              isAvailableMove={isAvailableMove(row, col)}
              selected={
                !selectedPiece
                  ? false
                  : selectedPiece.row === row && selectedPiece.column === col
              }
              onSquareClick={onSquareClick}
              color={getSquareColor(row, col)}
              markup={boardPieces[row][col] && boardPieces[row][col].markup}
              empty={boardPieces[row][col] === undefined}
              coordinates={[row, col]}
            />
          ),
        });
      }
    }

    return boardToRender;
  }, [
    boardPieces,
    selectedPiece,
    isAvailableMove,
    onAvailableSquareClick,
    onSquareClick,
    checkMode,
  ]);

  return (
    <div className="App">
      <div className="board">
        {renderBoard().map(({ Element }, i) => (
          <Element key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
