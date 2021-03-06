interface Props {
  empty: boolean;
  coordinates: number[];
  markup?: string;
  color: "white" | "black";
  onSquareClick?: (coordinates: number[]) => void;
  onAvailableSquareClick?: (coordinates: number[]) => void;
  selected: boolean;
  isAvailableMove: boolean;
  checkMode: boolean;
}

function Square(props: Props) {
  const {
    empty,
    onSquareClick,
    color,
    markup,
    coordinates,
    isAvailableMove,
    selected,
    onAvailableSquareClick,
    checkMode,
  } = props;

  const squareClickHandler = () => {
    if (!empty && onSquareClick) onSquareClick(coordinates);

    if (empty && onAvailableSquareClick) onAvailableSquareClick(coordinates);
  };

  return (
    <div
      onClick={squareClickHandler}
      className={`square ${color} ${selected ? "selected" : ""} ${
        isAvailableMove ? "available-move" : ""
      }
      ${checkMode ? "check-mode" : ""}
      `}
    >
      {markup && (
        <span className="piece" dangerouslySetInnerHTML={{ __html: markup }} />
      )}
    </div>
  );
}

export default Square;
