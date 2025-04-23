import { useState } from "react";
import "./Settings.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Era } from "../Era";

interface SettingsProps {
  popupActive: { settings: boolean, help: boolean, gameOver: boolean };
  setPopupActive: (state: any) => void;
  selectNewPlayer: (data: any) => void;
  filterData: () => any;
  resetGame: () => void;
  selectedEra: Era;
  setSelectedEra: (era: Era) => void;
}

function Settings({
  popupActive,
  setPopupActive,
  selectNewPlayer,
  filterData,
  resetGame,
  selectedEra,
  setSelectedEra,
}: SettingsProps) {
  const [dropdownActive, setDropdownActive] = useState({ active: false });
  const eraYears = [
    "All Years",
    "2010-Pres.",
    "2000-2009",
    "1990-1999",
    "1980-1989",
    "1968-1979",
  ];

  const handleExitClick = () => {
    setDropdownActive({ active: false });
    setPopupActive({ settings: false });
  };

  const handleDropdownClick = () => {
    if (dropdownActive.active) {
      setDropdownActive({ active: false });
    } else {
      setDropdownActive({ active: true });
    }
  };

  const handleNewPlayerClick = () => {
    // Select a new player from the filtered data
    selectNewPlayer(filterData());

    // Quit from the settings menu
    handleExitClick();
  };

  const handleResetClick = () => {
    // Reset the game
    resetGame();

    // Quit from the settings menu
    handleExitClick();
  };

  const handleDropdownItemClick = (id: Era) => {
    // Is the id equal to the already selected era?
    if (id !== selectedEra) {
      setSelectedEra(id);
      handleDropdownClick();
    }
  };

  return (
    <div id={popupActive.settings ? "show" : "hide"}>
      <div className="popupWall" />
      <div className="popup" id="settingsPopup">
        <button
          className="exitButton"
          id="settingsExit"
          onClick={() => {
            handleExitClick();
          }}
        >
          X
        </button>
        <div
          className="newPlayerButton"
          onClick={() => {
            handleNewPlayerClick();
          }}
        >
          <p>NEW PLAYER</p>
        </div>
        <div
          className="resetBoardButton"
          onClick={() => {
            handleResetClick();
          }}
        >
          <p>RESET BOARD</p>
        </div>
        <div className="eraDropdown">
          <p className="eraDropdownLabel">Selected Years:</p>
          <div
            className="eraDropdownButton"
            onClick={() => {
              handleDropdownClick();
            }}
            id={dropdownActive.active ? "active" : "inactive"}
          >
            <p>{eraYears[selectedEra]}</p>
          </div>

          <div
            className="eraDropdownContent"
            id={dropdownActive.active ? "show" : "hide"}
          >
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.AllPlayers);
              }}
            >
              <p>{eraYears[0]}</p>
            </div>
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.TwoThousandTens);
              }}
            >
              <p>{eraYears[1]}</p>
            </div>
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.TwoThousands);
              }}
            >
              <p>{eraYears[2]}</p>
            </div>
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.Nineties);
              }}
            >
              <p>{eraYears[3]}</p>
            </div>
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.Eighties);
              }}
            >
              <p>{eraYears[4]}</p>
            </div>
            <div
              className="eraDropdownItem"
              onClick={() => {
                handleDropdownItemClick(Era.Seventies);
              }}
              id="lastItem"
            >
              <p>{eraYears[5]}</p>
            </div>
          </div>
          {dropdownActive.active ? (
            <KeyboardArrowUpIcon
              className="dropdownArrowIcon"
              onClick={() => {
                handleDropdownClick();
              }}
            />
          ) : (
            <KeyboardArrowDownIcon
              className="dropdownArrowIcon"
              onClick={() => {
                handleDropdownClick();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
