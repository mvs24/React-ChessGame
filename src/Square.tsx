interface Props {
  empty: boolean;
  coordinates: number[];
  markup?: string;
  color: "white" | "black";
  onSquareClick?: (coordinates: number[]) => void;
  selected: boolean;
  isAvailableMove: boolean;
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
  } = props;

  const squareClickHandler = () => {
    if (!empty && onSquareClick) onSquareClick(coordinates);
  };

  return (
    <div
      onClick={squareClickHandler}
      className={`square ${color} ${selected ? "selected" : ""} ${
        isAvailableMove ? "available-move" : ""
      }`}
    >
      {markup && (
        <span className="piece" dangerouslySetInnerHTML={{ __html: markup }} />
      )}
    </div>
  );
}

export default Square;
