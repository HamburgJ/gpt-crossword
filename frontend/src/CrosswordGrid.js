import React from "react";
import "./CrosswordGrid.css";

const CrosswordGrid = ({ crosswordData }) => {
  return (
    <div className="crossword-table">
      {crosswordData.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="crossword-row">
          {row.map((cell, cellIndex) => (
            <div
              key={`cell-${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${
                cell === null ? "black-cell" : "white-cell"
              }`}
            >
              {cell !== null ? (
                <input type="text" maxLength="1" className="crossword-input" />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
