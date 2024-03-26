import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-4 text-3xl font-bold">Minesweeper</h1>
      <div className="mb-8 text-lg text-center sm:text-left">
        <p>
          Welcome to Minesweeper! This classic game challenges you to uncover
          cells without hitting any mines.
        </p>
        <p className="sm:inline">
          <strong>Rules:</strong> Click on a cell to uncover it. Right-click to
          flag a potential mine. Uncover all non-mine cells to win.
        </p>
      </div>
      <div className="text-lg">
        <label htmlFor="level" className="block mb-2 text-xl font-semibold">
          Select Level:
        </label>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="easy"
              className="px-4 py-2 transition duration-300 rounded-md hover:underline hover:font-semibold bg-sky-500"
            >
              Easy (10 bombs)
            </Link>
          </li>
          <li>
            <Link
              to="medium"
              className="px-4 py-2 transition duration-300 rounded-md hover:underline hover:font-semibold bg-lime-500"
            >
              Medium (30 bombs)
            </Link>
          </li>
          <li>
            <Link
              to="hard"
              className="px-4 py-2 transition duration-300 rounded-md hover:underline hover:font-semibold bg-rose-500"
            >
              Hard (40 bombs)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
