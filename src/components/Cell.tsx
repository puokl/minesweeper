import React from "react";
import { CellType } from "../types/CellTypes";

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenu(event);
  };

  const cellClasses = `
    w-8 h-8 border border-gray-300 text-center flex items-center justify-center text-black
    ${cell.isOpen ? "bg-gray-200" : "bg-gray-100"} ${
    cell.isFlagged ? "flagged" : ""
  }
  `;

  return (
    <div
      className={cellClasses}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      {" "}
      {cell.isFlagged && <span className="flag-icon">🚩</span>}
      {cell.isOpen
        ? cell.isBomb
          ? "💣"
          : cell.value === 0
          ? ""
          : cell.value
        : ""}
    </div>
  );
};

export default Cell;
