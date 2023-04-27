import React from "react";
import "./index.scss";

const CrosswordGrid = ({ crosswordData, userInput, updateInput, focus, onFocus }) => {
  const handleChange = (e, rowIndex, cellIndex) => {
    updateInput(rowIndex, cellIndex, e.target.value.toUpperCase());
  };

  console.log("focus", focus)

  return (
    <div className="crossword-table">
      {crosswordData.map((row, rowIndex) => (
        <div className="crossword-row" key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <div
              key={`cell-${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${
                cell === null ? "black-cell" : "white-cell"
              }`}
            >
              {cell !== null ? (
                <input
                  type="text"
                  maxLength="1"
                  className="crossword-input"
                  value={userInput[rowIndex][cellIndex]}
                  onChange={(e) => handleChange(e, rowIndex, cellIndex)}
                  onClick={() => { onFocus(rowIndex, cellIndex); }}
                  autoFocus={focus[0] === rowIndex && focus[1] === cellIndex}
                />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
