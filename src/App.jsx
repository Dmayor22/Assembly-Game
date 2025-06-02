import React from "react";
import Header from "./Component/Header";
import Status from "./Component/Status";
import Language from "./Component/Language";
import { languages } from "./languages";
import { useState } from "react";
import { clsx } from "clsx";
import { getFarewellText, ranWord } from "./utils";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";


function App() {
  // Confetti Setup
  const { width, height } = useWindowSize();

  // ALL STATES VALUES
  // declaring the word State
  const [currentWord, setCurrentWord] = useState(() => ranWord());

  // declaring the state for guessed letter by user... Static Value
  const [userGuess, setUserGuess] = useState([]);

  // Derived Value for getting user wrong letter as a count
  const wrongGuessCount = userGuess.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;

  // variable for GameLost
  const isGameLost = wrongGuessCount >= languages.length - 1;

  // variable for GameWon
  const isGameWon = currentWord.split("").every((letter) => {
    return userGuess.includes(letter);
  });

  // variable for isGameOver
  const isGameOver = isGameLost || isGameWon;

  // vairable for isLastGuessLetter and Incorrect Last Guest to display farewell
  const isLastGuessLetter = userGuess[userGuess.length - 1];
  const isLastGuessIncorrect =
    isLastGuessLetter && !currentWord.includes(isLastGuessLetter);

  // function to handle userguess and set the value to the userguess state variable
  const handleGuess = (letter) => {
    const oldLetter = userGuess;
    const updateUserLetterState = oldLetter.includes(letter)
      ? oldLetter
      : [...oldLetter, letter];

    setUserGuess(updateUserLetterState);
  };
  // variable for keyboard
  const keyboard = "abcdefghijklmnopqrstuvwxyz";

  // keybaord splitting and button
  const keyboardLetters = keyboard.split("").map((letters) => {
    // conditional statement for background color is true or false for button
    const isGuessed = userGuess.includes(letters);
    const isCorrect = isGuessed && currentWord.includes(letters);
    const isWrong = isGuessed && !currentWord.includes(letters);
    const reveal = currentWord;

    // using CLSX
    const className = clsx("key_letters", {
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letters}
        disabled={isGameOver}
        aria-disabled={userGuess.includes(letters)}
        aria-label={`Letter ${letters}`}
        onClick={() => handleGuess(letters)}
      >
        {letters.toUpperCase()}
      </button>
    );
  });

  // For splitting of word into an array from the currentWord State
  const wordSplit = currentWord.split("").map((itemWord, index) => {
    const className = clsx(
      "item_word",
      isGameLost && !userGuess.includes(itemWord) && "missed_letter"
    );
    return (
      <span className={className} key={index}>
        {userGuess.includes(itemWord)
          ? itemWord.toUpperCase()
          : isGameLost
          ? itemWord.toUpperCase()
          : ""}
      </span>
    );
  });

  // language chips component rendering based on language.js
  const languageChip = languages.map((langChip, index) => {
    return (
      <Language
        langChip={langChip}
        key={langChip.name}
        wrongGuessCount={wrongGuessCount}
        index={index}
      />
    );
  });

  // Reset Button
  const handleResetGame = () => {
    setUserGuess([]);
    setCurrentWord(ranWord());
  };
  return (
    <main>
      <Header />
      <Status
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessIncorrect={isLastGuessIncorrect}
        getFarewellText={getFarewellText}
        wrongGuessCount={wrongGuessCount}
        languages={languages}
      />
      <section className="lang_container">{languageChip}</section>
      <section className="current_word">{wordSplit}</section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(isLastGuessLetter)
            ? `Correct! The letter ${isLastGuessLetter} is in the word.`
            : `Sorry, the letter ${isLastGuessLetter} is not in the word.`}
          You have have {8 - wrongGuessCount} attempt left
        </p>
        <p>
          Current Word:
          {currentWord
            .split("")
            .map((letter) => {
              return userGuess.includes(letter) ? letter + "." : "blank.";
            })
            .join(" ")}
        </p>
      </section>
      <section className="key_container">{keyboardLetters}</section>

      {isGameOver && (
        <button className="new-game" onClick={handleResetGame}>
          New Game
        </button>
      )}

      {isGameWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
    </main>
  );
}

export default App;
