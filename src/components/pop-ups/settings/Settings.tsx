import { useState } from "react";
import "./Settings.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Era } from "../../Era";

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

  enum ExitClickSource {
    NewPlayer,
    ResetBoard,
    Other,
  }

  function handleExitingClick(source?: ExitClickSource) {
    if (source === ExitClickSource.NewPlayer) {
      selectNewPlayer(filterData());
    } else if (source === ExitClickSource.ResetBoard) {
      resetGame();
    }

    setDropdownActive({ active: false });
    setPopupActive({ settings: false });
  }

  const EraDropdown = () => {
    const handleDropdownClick = () => {
      setDropdownActive({ active: !dropdownActive.active });
    };

    function handleDropdownItemClick(era: Era) {
      setSelectedEra(era);
      handleDropdownClick();
    };

    const EraDropdownItem = ({ era }: { era: Era }) => {
      return (
        <div
          className="eraDropdownItem"
          onClick={() => {
            handleDropdownItemClick(era);
          }}
        >
          <p>{era}</p>
        </div>
      )
    }

    return (
      <>
        <div
          className="eraDropdownButton"
          onClick={() => {
            handleDropdownClick();
          }}
          id={dropdownActive.active ? "active" : "inactive"}
        >
          <p>{selectedEra}</p>
        </div>
        <div
          className="eraDropdownContent"
          id={dropdownActive.active ? "show" : "hide"}
        >
          <EraDropdownItem era={Era.All} />
          <EraDropdownItem era={Era.TwoThousandTens} />
          <EraDropdownItem era={Era.TwoThousands} />
          <EraDropdownItem era={Era.Nineties} />
          <EraDropdownItem era={Era.Eighties} />
          <EraDropdownItem era={Era.Seventies} />
        </div>
        {
          dropdownActive.active ? (
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
          )
        }
      </>
    )
  }

  return (
    <div id={popupActive.settings ? "show" : "hide"}>
      <div className="popupWall" />
      <div className="popup" id="settingsPopup">
        <button
          className="exitButton"
          id="settingsExit"
          onClick={() => handleExitingClick(ExitClickSource.Other)}
        >
          X
        </button>
        <div
          className="newPlayerButton"
          onClick={() => handleExitingClick(ExitClickSource.NewPlayer)}
        >
          <p>NEW PLAYER</p>
        </div>
        <div
          className="resetBoardButton"
          onClick={() => handleExitingClick(ExitClickSource.ResetBoard)}
        >
          <p>RESET BOARD</p>
        </div>
        <div className="eraDropdown">
          <p className="eraDropdownLabel">Selected Years:</p>
          <EraDropdown />
        </div>
      </div>
    </div >
  );
}

export default Settings;
