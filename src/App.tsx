import { useCallback } from "react";
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
  board[0][4] = new King([0, 4], piecesString.blackKing, "black");

  board[7][0] = new Rook([7, 0], piecesString.whiteRook, "white");
  board[7][7] = new Rook([7, 7], piecesString.whiteRook, "white");
  board[7][1] = new Knight([7, 1], piecesString.whiteKnight, "white");
  board[7][6] = new Knight([7, 6], piecesString.whiteKnight, "white");
  board[7][2] = new Bishop([7, 2], piecesString.whiteBishop, "white");
  board[7][5] = new Bishop([7, 5], piecesString.whiteBishop, "white");
  board[7][3] = new Queen([7, 3], piecesString.whiteQueen, "white");
  board[7][4] = new King([7, 4], piecesString.whiteKing, "white");

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
  const [boardPieces, setBoardPieces] = useState<Piece[][]>(generatePieces());
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(
    undefined
  );
  const [availableMoves, setAvailableMoves] = useState<number[][] | undefined>(
    undefined
  );

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
      if (selectedPiece === undefined) {
      }

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

  const onAvailableSquareClick = useCallback(
    (coordinates: number[]) => {
      if (!selectedPiece) return;

      const [nextRow, nextColumn] = coordinates;

      if (!isAvailableMove(nextRow, nextColumn)) return;

      const selectedPieceRow = selectedPiece.row;
      const selectedPieceColumn = selectedPiece.column;

      const updatedBoardPieces = [...boardPieces];
      // @ts-ignore
      updatedBoardPieces[selectedPieceRow][selectedPieceColumn] = undefined;
      updatedBoardPieces[nextRow][nextColumn] = selectedPiece;

      // @ts-ignore
      selectedPiece.setCoordinates([nextRow, nextColumn]);

      setBoardPieces(updatedBoardPieces);
      setAvailableMoves(undefined);
      setSelectedPiece(undefined);
      changeTurn();
    },
    [isAvailableMove, selectedPiece, boardPieces, changeTurn]
  );

  const onSquareClick = useCallback(
    (coordinates: number[]) => {
      const [row, column] = coordinates;
      const selectedPiece = boardPieces[row][column];

      if (isValidSelectedPiece(selectedPiece)) {
        setSelectedPiece(selectedPiece);

        // @ts-ignore
        const availableMoves = selectedPiece.getAvailableMoves(boardPieces);
        setAvailableMoves(availableMoves);
      } else {
        setTimeout(() => {
          alert("Not access for that piece");
        });
      }
    },
    [boardPieces, isValidSelectedPiece]
  );

  const renderBoard = useCallback(() => {
    const boardToRender: { coordinates: number[]; Element: React.FC }[] = [];

    for (let row = 0; row < boardPieces.length; row++) {
      for (let col = 0; col < boardPieces[row].length; col++) {
        boardToRender.push({
          coordinates: [row, col],
          Element: () => (
            <Square
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
