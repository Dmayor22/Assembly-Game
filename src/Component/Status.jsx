import React from "react";
import { clsx } from "clsx";




const Status = ({
  isGameWon,
  isGameLost,
  isLastGuessIncorrect,
  getFarewellText,
  wrongGuessCount,
  languages,
}) => {
  const className = clsx("game_status", {
    farewell: isLastGuessIncorrect,
  });

  console.log(wrongGuessCount);
  return (
    <section
      aria-live="polite"
      role="status"
      className={className}
      style={{
        backgroundColor: isGameWon ? "#10a95b" : isGameLost ? "#ec5049" : null,
      }}
    >
      <h2>
        {isGameWon
          ? "You Win"
          : isGameLost
          ? "You Lost"
          : isLastGuessIncorrect
          ? getFarewellText(languages[wrongGuessCount - 1].name)
          : null}
      </h2>
      <p>
        {isGameWon
          ? "Well done! 🎉 "
          : isGameLost
          ? "You lose! Better learning assembly 😭"
          : null}
      </p>
    </section>
  );
};

export default Status;
