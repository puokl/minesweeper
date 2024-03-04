import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-3xl font-bold">Minesweeper</h1>
      <div className="mb-4 text-center">
        <p>
          Welcome to Minesweeper! This classic game challenges you to uncover
          cells without hitting any mines.
        </p>
        <p>
          Rules: Click on a cell to uncover it. Right-click to flag a potential
          mine. Uncover all non-mine cells to win.
        </p>
      </div>
      <div className="text-lg">
        <label htmlFor="level" className="block mb-2 text-xl font-semibold">
          Select Level:
        </label>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="easy" className="hover:underline hover:font-semibold">
              Easy
            </Link>
          </li>
          <li>
            <Link to="medium" className="hover:underline hover:font-semibold">
              Medium
            </Link>
          </li>
          <li>
            <Link to="hard" className="hover:underline hover:font-semibold">
              Hard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
