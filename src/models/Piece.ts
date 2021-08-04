export abstract class Piece {
  public captured = false;
  public row: number;
  public column: number;
  constructor(
    public coordinates: number[],
    public markup: string,
    public color: "white" | "black"
  ) {
    this.row = coordinates[0];
    this.column = coordinates[1];
  }

  capturePiece() {
    this.captured = true;
  }
}
