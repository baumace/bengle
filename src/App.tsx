import "./App.css";
import Board from "./components/board/Board";
import SearchBox from "./components/search-box/SearchBox";
import GameOverPopUp from "./components/pop-ups/game-over/GameOverPopUp";
import HelpPopUp from "./components/pop-ups/help/HelpPopUp";
import SettingsPopUp from "./components/pop-ups/settings/SettingsPopUp";
import { useState } from "react";
import draftPicks from "./data/DraftPicks.json";
import { Era } from "./components/Era";
import { Player } from "./components/Player";

const MAX_ATTEMPTS = 7;
const INITIAL_ATTEMPT = 1;
const DEFAULT_BOARD = [
  ["PLAYER", "COLLEGE", "YEAR", "POS", "RND", "PICK"],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

// Create the initial correct player
let correctPick: Player =
  draftPicks[Math.floor(Math.random() * draftPicks.length)];
console.log(correctPick);

function App() {
  const [picksArray, setPicksArray] = useState<Player[]>(draftPicks);
  const [board, setBoard] = useState(DEFAULT_BOARD.slice());
  const [currAttempt, setCurrAttempt] = useState<number>(INITIAL_ATTEMPT);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedPlayer: false,
  });
  const [isGameOverPopupActive, setGameOverPopupActive] = useState(false);
  const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL);

  /*
   * Selects the passed player, updating the game accordingly.
   */
  function selectPlayer(player: Player) {
    // Store the attempt number
    const attemptNum = currAttempt;

    // Store the board
    const newBoard = [...board];

    // Fill in the board's row with the player's information
    newBoard[attemptNum][0] = player.name;
    newBoard[attemptNum][1] = player.college;
    newBoard[attemptNum][2] = player.year.toString();
    newBoard[attemptNum][3] = player.position;
    newBoard[attemptNum][4] = player.round.toString();
    newBoard[attemptNum][5] = player.pick.toString();

    // Update the board to include this new player
    setBoard(newBoard);

    // Increment the currAttempt
    setCurrAttempt(attemptNum + 1);

    // Has the user selected the correctPick?
    if (player === correctPick) {
      // Yes, so indicate the game is over and the user selected the correct player
      setGameOver({ gameOver: true, guessedPlayer: true });

      // Activate the gameOver popup
      setGameOverPopupActive(true);
    } else if (attemptNum === MAX_ATTEMPTS) {
      // Selection is incorrect, so check if the user used their last attempt
      // Yes, so indicate the game is over and the user did not select the correct player
      setGameOver({ gameOver: true, guessedPlayer: false });

      // Activate the gameOver popup
      setGameOverPopupActive(true);
    }
  }

  function resetGame() {
    // Store the current board
    const newBoard = [...board];

    // Loop through the rows that were modified in the attempt
    for (let i = 1; i < currAttempt; i++) {
      // Loop through the cells within the row
      for (let j = 0; j < 6; j++) {
        // Set the element's contents to be empty
        newBoard[i][j] = "";
      }
    }

    // Reset the attempt number
    setCurrAttempt(INITIAL_ATTEMPT);

    // Set the board to the cleared board
    setBoard(newBoard);

    // Reset gameOver in case it has been modified
    setGameOver({ gameOver: false, guessedPlayer: false });
  }

  const selectNewPlayer = (dataArray: Player[]) => {
    correctPick = dataArray[Math.floor(Math.random() * dataArray.length)];
    resetGame();
  };

  function draftPicksFilter(player: Player, era: Era): boolean {
    switch (era) {
      case Era.SEVENTIES:
        return player.year < 1980;
      case Era.EIGHTIES:
        return player.year >= 1980 && player.year < 1990;
      case Era.NINETIES:
        return player.year >= 1990 && player.year < 2000;
      case Era.TWO_THOUSAND:
        return player.year >= 2000 && player.year < 2010;
      case Era.TWO_THOUSAND_TENS:
        return player.year >= 2010;
      default:
        return true;
    }
  }

  const filterData = () => {
    let filteredDraftPicks = draftPicks;
    filteredDraftPicks = filteredDraftPicks.filter((player) => draftPicksFilter(player, selectedEra));
    setPicksArray(filteredDraftPicks);
    return filteredDraftPicks;
  };

  return (
    <div className="App">
      <header>
        <h1>BENGLE</h1>
        <h2>Bengals Draft Day Selections</h2>
      </header>
      <HelpPopUp />
      <SettingsPopUp
        selectNewPlayer={selectNewPlayer}
        filterData={filterData}
        resetGame={resetGame}
        selectedEra={selectedEra}
        setSelectedEra={setSelectedEra}
      />
      <div className="game">
        <Board board={board} correctPick={correctPick} currentAttempt={currAttempt} />{" "}
        {gameOver.gameOver ? (
          <div
            className="appNewPlayerButton"
            onClick={() => {
              selectNewPlayer(filterData());
            }}
          >
            <p className="appNewPlayerText">NEW PLAYER</p>
          </div>
        ) : (
          <div
            className="giveUpButton"
            onClick={() => {
              setGameOver({ gameOver: true, guessedPlayer: false });
              setGameOverPopupActive(true);
            }}
          >
            <p className="giveUpText">GIVE UP</p>
          </div>
        )}
        <div
          className="showResultsButton"
          onClick={() => {
            setGameOverPopupActive(true);
          }}
          id={gameOver.gameOver ? "show" : "hide"}
        >
          <p className="showResultsText">SHOW RESULTS</p>
        </div>
        <SearchBox
          placeholder={gameOver.gameOver ? "Game Over" : `Selection ${currAttempt} of ${MAX_ATTEMPTS}`}
          data={picksArray}
          disabled={gameOver.gameOver}
          selectPlayer={selectPlayer}
        />
      </div>
      <footer>
        <p>
          Data Source:{" "}
          <a href="https://www.pro-football-reference.com/teams/cin/draft.htm">
            Pro Football Reference
          </a>
        </p>
        <p>
          Inspired by <a href="https://poeltl.dunk.town/">Poeltl</a>
        </p>
      </footer>
      <GameOverPopUp
        gameOver={gameOver}
        currAttempt={currAttempt}
        correctPick={correctPick}
        popupActive={isGameOverPopupActive}
        setPopupActive={setGameOverPopupActive}
      />
    </div>
  );
}

export default App;