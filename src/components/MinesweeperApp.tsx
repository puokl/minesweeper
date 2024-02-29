import React, { useState } from "react";
import MinesweeperBoard from "./MinesweeperBoard";
import { generateBoard } from "./Board";
import { CellType } from "../types/CellTypes";

interface MinesweeperAppProps {
  difficulty: "easy" | "medium" | "hard";
}

const MinesweeperApp: React.FC<MinesweeperAppProps> = ({ difficulty }) => {
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(
    generateBoard(
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      difficulty === "easy" ? 20 : difficulty === "medium" ? 30 : 40
    )
  );
  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;

    const newBoard = [...board];

    // Check if the clicked cell is already open or flagged
    if (!newBoard[row][col].isOpen && !newBoard[row][col].isFlagged) {
      // If the cell is a bomb, reveal all bombs and set game over
      if (newBoard[row][col].isBomb) {
        revealAllBombs(newBoard);
        setGameOver(true);
        alert("Game over! You clicked on a bomb.");
      } else {
        // If the cell is not a bomb, reveal the cell
        newBoard[row][col].isOpen = true;

        // If the cell is empty, recursively reveal adjacent empty cells
        if (newBoard[row][col].value === 0) {
          revealAdjacentEmptyCells(newBoard, row, col);
        }

        setBoard(newBoard);
      }
    }
  };

  const handleCellRightClick = (row: number, col: number) => {
    // Handle right-click logic (flagging/unflagging)
    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const revealAllBombs = (board: CellType[][]) => {
    // Iterate through the entire board to reveal all bombs
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].isBomb) {
          board[i][j].isOpen = true;
        }
      }
    }
  };

  const revealAdjacentEmptyCells = (
    board: CellType[][],
    row: number,
    col: number
  ) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          if (!board[newRow][newCol].isOpen) {
            board[newRow][newCol].isOpen = true;

            // Recursively reveal adjacent empty cells
            if (board[newRow][newCol].value === 0) {
              revealAdjacentEmptyCells(board, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const restartGame = () => {
    setBoard(
      generateBoard(
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 20 : difficulty === "medium" ? 30 : 40
      )
    );
    setGameOver(false);
  };

  return (
    <div>
      <h1>Minesweeper - {difficulty} level</h1>
      <MinesweeperBoard
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
      {gameOver && <button onClick={restartGame}>Restart Game</button>}
    </div>
  );
};

export default MinesweeperApp;
