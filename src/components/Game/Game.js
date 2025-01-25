import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import Guesses from "./Guesses";
import { checkGuess } from "../../game-helpers";

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [entry, setEntry] = React.useState("");
  const [guesses, setGuesses] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [gameState, setGameState] = React.useState("ongoing");

  function submitGuess(event) {
    event.preventDefault();

    if (gameOver) return;
    if (guesses.length >= NUM_OF_GUESSES_ALLOWED) return;
    if (entry.length !== 5) return;

    const guess = checkGuess(entry, answer);
    const newGuesses = [...guesses, guess];

    setGuesses(newGuesses);
    setEntry("");

    const isFound = guess.every((char) => char.status === "correct");

    if (isFound) {
      setGameOver(true);
      setGameState("win");
      return;
    }

    if (newGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameOver(true);
      setGameState("lose");
      return;
    }
  }

  function restart() {
    const answer = sample(WORDS);

    console.info({ answer });

    setEntry("");
    setGuesses([]);
    setAnswer(answer);
    setGameState("ongoing");
    setGameOver(false);
  }

  return (
    <>
      {gameOver && gameState === "win" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>{guesses.length} guesses</strong>.
          </p>
          <p>
            <button onClick={restart}>Restart</button>
          </p>
        </div>
      )}

      {gameOver && gameState === "lose" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <p>
            <button onClick={restart}>Restart</button>
          </p>
        </div>
      )}

      <Guesses
        numGuessesAllowed={NUM_OF_GUESSES_ALLOWED}
        guesses={guesses}
      ></Guesses>

      <form className="guess-input-wrapper" onSubmit={submitGuess}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          pattern="^[a-zA-Z]{5}$"
          minLength="5"
          maxLength="5"
          id="guess-input"
          type="text"
          value={entry}
          onChange={(event) =>
            setEntry(event.target.value.toUpperCase().replace(/[^A-Z]+/g, ""))
          }
        />
      </form>
    </>
  );
}

export default Game;
