import React from "react";

function Guess({ guess }) {
  // data is immutable, it's okay to use idx as key
  return (
    <p className="guess">
      {guess.map(({ letter, status }, idx) => (
        <span key={idx} className={`cell ${status}`}>
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
