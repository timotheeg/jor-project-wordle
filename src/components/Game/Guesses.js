import React from "react";

import Guess from "./Guess";

function Guesses({ numGuessesAllowed, guesses }) {
  const guessGrid = [...guesses];

  while (guessGrid.length < numGuessesAllowed) {
    guessGrid.push(
      Array(5).fill({
        letter: " ",
        status: "",
      }),
    );
  }

  // note: guesses are immutable, it's okay to use index as key
  return (
    <div className="guess-results">
      {guessGrid.map((guess, idx) => (
        <Guess key={idx} guess={guess} />
      ))}
    </div>
  );
}

export default Guesses;
