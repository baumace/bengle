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

const MAX_ATTEMPTS = 6;
const INITIAL_ATTEMPT = 0;

function App() {
  const [picksArray, setPicksArray] = useState<Player[]>(draftPicks);
  const [board, setBoard] = useState<Player[]>([]);
  const [currAttempt, setCurrAttempt] = useState<number>(INITIAL_ATTEMPT);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedPlayer: false,
  });
  const [isGameOverPopupActive, setGameOverPopupActive] = useState(false);
  const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL);
  const [correctPick, setCorrectPick] = useState<Player>(draftPicks[Math.floor(Math.random() * draftPicks.length)]);

  /*
   * Selects the passed player, updating the game accordingly.
   */
  function selectPlayer(player: Player) {
    const attemptNum = currAttempt;
    setBoard([...board, player]);

    setCurrAttempt(attemptNum + 1);

    // Has the user selected the correctPick?
    if (player === correctPick) {
      setGameOver({ gameOver: true, guessedPlayer: true });
      setGameOverPopupActive(true);
    } else if (attemptNum === MAX_ATTEMPTS) {
      setGameOver({ gameOver: true, guessedPlayer: false });
      setGameOverPopupActive(true);
    }
  }

  function resetGame() {
    setBoard([]);
    setCurrAttempt(INITIAL_ATTEMPT);
    setGameOver({ gameOver: false, guessedPlayer: false });
  }

  const setNewPlayer = (dataArray: Player[]) => {
    setCorrectPick(dataArray[Math.floor(Math.random() * dataArray.length)]);
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
        selectNewPlayer={setNewPlayer}
        filterData={filterData}
        resetGame={resetGame}
        selectedEra={selectedEra}
        setSelectedEra={setSelectedEra}
      />
      <div className="game">
        <Board board={board} correctPick={correctPick} />{" "}
        {gameOver.gameOver ? (
          <div
            className="appNewPlayerButton"
            onClick={() => {
              setNewPlayer(filterData());
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
          placeholder={gameOver.gameOver ? "Game Over" : `Selection ${currAttempt + 1} of ${MAX_ATTEMPTS + 1}`}
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