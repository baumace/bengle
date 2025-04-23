import "./App.css";
import Board from "./components/board/Board";
import SearchBox from "./components/search-box/SearchBox";
import GameOver from "./components/pop-ups/game-over/GameOver";
import Help from "./components/pop-ups/help/Help";
import Settings from "./components/pop-ups/settings/Settings";
import { useState } from "react";
import draftPicks from "./data/DraftPicks.json";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { Era } from "./components/Era";
import { Player } from "./components/Player";

// Create constants
const MAX_ATTEMPTS = 7;
const INITIAL_ATTEMPT = 1;

// Create the initial correct player
let correctPick: Player =
  draftPicks[Math.floor(Math.random() * draftPicks.length)];

// Default board to be displayed
const defaultBoard = [
  ["PLAYER", "COLLEGE", "YEAR", "POS", "RND", "PICK"],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

function App() {
  const [picksArray, setPicksArray] = useState<Player[]>(draftPicks);
  const [board, setBoard] = useState(defaultBoard);
  const [currAttempt, setCurrAttempt] = useState<number>(INITIAL_ATTEMPT);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedPlayer: false,
  });
  const [popupActive, setPopupActive] = useState({
    gameOver: false,
    help: false,
    settings: false,
  });
  const [selectedEra, setSelectedEra] = useState<Era>(Era.AllPlayers);

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
      setPopupActive({ gameOver: true, help: popupActive.help, settings: popupActive.settings });
    } else if (attemptNum === MAX_ATTEMPTS) {
      // Selection is incorrect, so check if the user used their last attempt
      // Yes, so indicate the game is over and the user did not select the correct player
      setGameOver({ gameOver: true, guessedPlayer: false });

      // Activate the gameOver popup
      setPopupActive({ gameOver: true, help: popupActive.help, settings: popupActive.settings });
    }
  }

  /*
   * Resets the game to its initial state, does not change the correct pick.
   */
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

  const filterData = () => {
    let newFilter;
    if (selectedEra === Era.AllPlayers) {
      newFilter = draftPicks;
    } else {
      newFilter = draftPicks.filter((value) => {
        switch (selectedEra) {
          case Era.Seventies:
            if (value.year <= 1979) {
              return value;
            }
            break;
          case Era.Eighties:
            if (value.year >= 1980 && value.year <= 1989) {
              return value;
            }
            break;
          case Era.Nineties:
            if (value.year >= 1990 && value.year <= 1999) {
              return value;
            }
            break;
          case Era.TwoThousands:
            if (value.year >= 2000 && value.year <= 2009) {
              return value;
            }
            break;
          case Era.TwoThousandTens:
            if (value.year >= 2010) {
              return value;
            }
            break;
          default:
            break;
        }
      });
    }

    // Set the picks data to be the new filtered data
    setPicksArray(newFilter);

    // Return the newFilter
    return newFilter;
  };

  return (
    <div className="App">
      <Header />
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
              setPopupActive({ gameOver: true, help: popupActive.help, settings: popupActive.settings });
            }}
          >
            <p className="giveUpText">GIVE UP</p>
          </div>
        )}
        <div
          className="showResultsButton"
          onClick={() => {
            setPopupActive({ gameOver: true, help: popupActive.help, settings: popupActive.settings });
          }}
          id={gameOver.gameOver ? "show" : "hide"}
        >
          <p className="showResultsText">SHOW RESULTS</p>
        </div>
        {gameOver.gameOver ? (
          <SearchBox
            placeholder={"Game Over"}
            data={picksArray}
            disabled={true}
            selectPlayer={selectPlayer}
          />
        ) : (
          <SearchBox
            placeholder={
              "Selection " + currAttempt + " of " + MAX_ATTEMPTS
            }
            data={picksArray}
            disabled={false}
            selectPlayer={selectPlayer}
          />
        )}
      </div>
      <Footer />
      <GameOver
        gameOver={gameOver}
        currAttempt={currAttempt}
        correctPick={correctPick}
        popupActive={popupActive}
        setPopupActive={setPopupActive}
      />
      <Help popupActive={popupActive} setPopupActive={setPopupActive} />
      <Settings
        popupActive={popupActive}
        setPopupActive={setPopupActive}
        selectNewPlayer={selectNewPlayer}
        filterData={filterData}
        resetGame={resetGame}
        selectedEra={selectedEra}
        setSelectedEra={setSelectedEra}
      />
    </div>
  );

  function Header() {
    return <header>
      <h1>BENGLE</h1>
      <h2>Bengals Draft Day Selections</h2>
      <button
        className="headerButton"
        id="helpButton"
        onClick={() => setPopupActive({ help: true, settings: popupActive.settings, gameOver: popupActive.gameOver })}
      >
        <HelpIcon className="headerButtonIcon" />
      </button>
      <button
        className="headerButton"
        id="settingsButton"
        onClick={() => setPopupActive({ settings: true, help: popupActive.help, gameOver: popupActive.gameOver })}
      >
        <SettingsIcon className="headerButtonIcon" />
      </button>
    </header>;
  }

  function Footer() {
    return <footer>
      <p>
        Data Source:{" "}
        <a href="https://www.pro-football-reference.com/teams/cin/draft.htm">
          Pro Football Reference
        </a>
      </p>
      <p>
        Inspired by <a href="https://poeltl.dunk.town/">Poeltl</a>
      </p>
    </footer>;
  }

}

export default App;