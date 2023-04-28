import React from 'react';

const Clues = ({ direction, clues }) => (
  <div className="clues">
    <h2>{direction}</h2>
    <ul className="clueList">
      {clues.map((clue) => (
        <li key={`${clue.number}-${direction}`}><b>{clue.number}</b> {clue.clue}</li>
      ))}
    </ul>
  </div>
);

export default Clues;
