import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-3xl font-bold">Minesweeper</h1>
      <div className="mb-4">
        <p className="text-center">
          Welcome to Minesweeper! This classic game challenges you to uncover
          cells without hitting any mines.
        </p>
        <p className="text-center">
          Rules: Click on a cell to uncover it. Right-click to flag a potential
          mine. Uncover all non-mine cells to win.
        </p>
      </div>
      <div>
        <label htmlFor="level">Select Level:</label>
        <ul>
          <li>
            <Link to="easy">Easy</Link>
          </li>
          <li>
            <Link to="medium">Medium</Link>
          </li>
          <li>
            <Link to="hard">Hard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
