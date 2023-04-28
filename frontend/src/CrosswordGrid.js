import React from "react";
import "./index.scss";

const CrosswordGrid = ({ crosswordData, userInput, updateInput, focus, onFocus, clues }) => {
  const handleChange = (e, rowIndex, cellIndex) => {
    updateInput(rowIndex, cellIndex, e.target.value.toUpperCase());
  };

  const words = clues.horizontal.concat(clues.vertical);

  const get_location_number = (row, col) => {
    const word = words.find(element => element.location.row === row && element.location.column === col);
    if (word) {
      return word.number;
    }
    return null;
  };

  return (
    <div className="crossword-table">
      {crosswordData.map((row, rowIndex) => (
        <div className="crossword-row" key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <React.Fragment key={`cell-wrapper-${rowIndex}-${cellIndex}`} >
              <div className="crossword-number">
                {get_location_number(rowIndex, cellIndex)}
              </div>
              <div
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
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
