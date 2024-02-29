export interface CellType {
  coordinates: { row: number; col: number };
  value: number; // The number of bombs adjacent to the cell
  isBomb: boolean;
  isFlagged: boolean;
  isOpen: boolean;
}
