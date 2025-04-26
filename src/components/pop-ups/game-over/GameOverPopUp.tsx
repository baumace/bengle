import { Player } from "../../../models/Player";
import "./GameOverPopUp.css";

interface GameOverPopUpProps {
  gameOver: { guessedPlayer: boolean };
  currAttempt: number;
  correctPick: Player;
  popupActive: boolean;
  setPopupActive: (state: boolean) => void;
}

function GameOverPopUp({ gameOver, currAttempt, correctPick, popupActive, setPopupActive }: GameOverPopUpProps) {

  function WinScreen() {
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

  function LoseScreen() {
    return (
      <div>
        <p>Draft bust! You were not able to select the correct player.</p>
      </div>
    );
  };

  return (
    <div id={popupActive ? "show" : "hide"}>
      <div className="popupWall" />
      <div className="popup" id="gameOverPopup">
        <button
          className="exitButton"
          onClick={() => {
            setPopupActive(false);
          }}
        >
          X
        </button>
        <div className="gameOverText">
          {gameOver.guessedPlayer ? <WinScreen /> : <LoseScreen />}
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

export default GameOverPopUp;
