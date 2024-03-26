import React, { useState, useEffect } from "react";
import MinesweeperBoard from "./MinesweeperBoard";
import { generateBoard } from "./Board";
import { CellType } from "../types/CellTypes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import "../style.css";

interface MinesweeperAppProps {
  difficulty: "easy" | "medium" | "hard";
}

const MinesweeperApp: React.FC<MinesweeperAppProps> = ({ difficulty }) => {
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(
    generateBoard(
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
      difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
    )
  );

  const [bombCount, setBombCount] = useState(
    difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
  );

  const [flagCount, setFlagCount] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const navigate = useNavigate();

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
        setRevealedCount((prevCount) => prevCount + 1);
        setBoard(newBoard);
      }
    }
  };

  const handleCellRightClick = (row: number, col: number) => {
    const newBoard = [...board];
    // newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    const currentCell = newBoard[row][col];
    if (!currentCell.isFlagged && flagCount < bombCount) {
      currentCell.isFlagged = true;
      setFlagCount((prevCount) => prevCount + 1);
    } else if (currentCell.isFlagged) {
      currentCell.isFlagged = false;
      setFlagCount((prevCount) => prevCount - 1);
    }
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

  const checkWinCondition = () => {
    const nonBombCells = board.flat().filter((cell) => !cell.isBomb);
    const revealedNonBombCells = nonBombCells.filter((cell) => cell.isOpen);

    if (revealedNonBombCells.length === nonBombCells.length) {
      // alert("You won!");
      console.log("check win condition");
      setIsGameWon(true);
    }
  };

  const restartGame = () => {
    setBoard(
      generateBoard(
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20,
        difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
      )
    );
    setBombCount(
      difficulty === "easy" ? 10 : difficulty === "medium" ? 30 : 40
    );
    setFlagCount(0);
    setGameOver(false);
    setIsGameWon(false);
    setShowWinModal(false);
  };

  const goHome = () => {
    navigate("https://mastermind-topaz.vercel.app/");
  };

  useEffect(() => {
    checkWinCondition();
    console.log("check condition");
  }, [revealedCount]);

  useEffect(() => {
    if (isGameWon && !gameOver) {
      setShowWinModal(true);
    }
  }, [isGameWon, gameOver]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link
        to="https://mastermind-topaz.vercel.app"
        className="absolute z-10 text-black top-4 right-4 bg-slate-200 rounded-xl"
      >
        <RiHome2Line size={32} />
      </Link>
      <h1 className="mb-4 text-2xl font-bold">MINESWEEPER</h1>
      <div className="text-lg info-panel">
        <div className="info-item">
          <span className="mr-2 font-semibold">Level:</span>
          <span>{difficulty}</span>
        </div>
        <div className="info-item">
          <span className="mr-2 font-semibold">Bombs:</span>
          <span>{bombCount}</span>
        </div>
        <div className="info-item">
          <span className="mr-2 font-semibold">Flags:</span>
          <span>{flagCount}</span>
        </div>
      </div>

      <MinesweeperBoard
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />

      {gameOver && (
        <div>
          <p className="my-4 text-2xl font-bold text-red-500">Game Over</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={restartGame}
              className="font-bold hover:underline text-stone-700"
            >
              Play Again
            </button>
            <button
              onClick={goHome}
              className="font-bold hover:underline text-stone-700"
            >
              Home
            </button>
          </div>
        </div>
      )}

      {showWinModal && (
        <div className="relative win-modal">
          <p className="my-4 text-4xl font-bold text-red-500">You won!</p>

          <div
            className="confetti"
            style={{ animation: "confetti-fall 1s ease-out infinite" }}
          ></div>
          <div className="flex gap-4 mt-4">
            <button onClick={restartGame} className="font-bold hover:underline">
              Play Again
            </button>
            <button onClick={goHome} className="font-bold hover:underline">
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinesweeperApp;
