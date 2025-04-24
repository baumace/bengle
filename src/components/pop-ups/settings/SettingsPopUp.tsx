import { useState } from "react";
import "./SettingsPopUp.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import { Era } from "../../Era";

interface SettingsPopUpProps {
  selectNewPlayer: (data: any) => void;
  filterData: () => any;
  resetGame: () => void;
  selectedEra: Era;
  setSelectedEra: (era: Era) => void;
}

function SettingsPopUp({
  selectNewPlayer,
  filterData,
  resetGame,
  selectedEra,
  setSelectedEra,
}: SettingsPopUpProps) {
  const [dropdownActive, setDropdownActive] = useState({ active: false });
  const [isVisible, setVisibility] = useState(false);

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
    setVisibility(false);
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
    <>
      <button
        className="headerButton"
        id="settingsButton"
        onClick={() => setVisibility(true)}
      >
        <SettingsIcon className="headerButtonIcon" />
      </button>
      <div id={isVisible ? "show" : "hide"}>
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
    </>
  );
}

export default SettingsPopUp;
