import "./GameOver.css";

interface GameOverProps {
  gameOver: { guessedPlayer: boolean };
  currAttempt: number;
  correctPick: Player;
  popupActive: { gameOver: boolean };
  setPopupActive: (state: any) => void;
}

function GameOver({ gameOver, currAttempt, correctPick, popupActive, setPopupActive }: GameOverProps) {
  const winScreen = () => {
    return (
      <div>
        <p>Draft grade: A+</p>
        <p>
          You guessed the correct player in {currAttempt - 1}{" "}
          selections!
        </p>
      </div>
    );
  };

  const loseScreen = () => {
    return (
      <div>
        <p>Draft bust! You were not able to select the correct player.</p>
      </div>
    );
  };

  return (
    <div id={popupActive.gameOver ? "show" : "hide"}>
      <div className="popupWall" />
      <div className="popup" id="gameOverPopup">
        <button
          className="exitButton"
          onClick={() => {
            setPopupActive({ gameOver: false });
          }}
        >
          X
        </button>
        <div className="gameOverText">
          {gameOver.guessedPlayer ? winScreen() : loseScreen()}
          <p>
            The correct player is {correctPick.name}, {correctPick.position}{" "}
            from {correctPick.college}.
          </p>
          <p>
            Selected with the #{correctPick.pick} overall pick in round{" "}
            {correctPick.round} of the {correctPick.year} NFL Draft
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
