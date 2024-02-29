import { CellType } from "../types/CellTypes";

export const generateBoard = (
  rows: number,
  cols: number,
  numBombs: number
): CellType[][] => {
  const board: CellType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      coordinates: { row: 0, col: 0 },
      value: 0,
      isBomb: false,
      isFlagged: false,
      isOpen: false,
    }))
  );

  // Place bombs randomly on the board
  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    if (!board[randomRow][randomCol].isBomb) {
      board[randomRow][randomCol].isBomb = true;
      bombsPlaced++;
    }
  }

  // Calculate the number of bombs adjacent to each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j].isBomb) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const newRow = i + dx;
            const newCol = j + dy;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (board[newRow][newCol].isBomb) {
                board[i][j].value++;
              }
            }
          }
        }
      }
    }
  }
  console.log("board", board);
  return board;
};
