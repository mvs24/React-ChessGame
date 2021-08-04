export abstract class Piece {
  public captured = false;
  public row: number;
  public column: number;

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
}
