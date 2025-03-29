import "./Help.css";
import React, { useContext } from "react";
import { AppContext } from "../../App";

function Help() {
  const { popupActive, setPopupActive } = useContext(AppContext);

  return (
    <div id={popupActive.help ? "show" : "hide"}>
      <div className="popupWall" />
      <div className="popup" id="helpPopup">
        <button
          className="exitButton"
          onClick={() => {
            setPopupActive({ help: false });
          }}
        >
          X
        </button>
        <div className="helpText">
          <ul>
            <li>
              Your goal is to select the correct player whose name was on a
              Bengal's draft card
            </li>
            <li>
              You have 7 selections to make the correct pick and find your draft
              gem
            </li>
            <li>
              A <mark id="green">green box</mark> means that the information is
              correct
            </li>
            <li>
              A <mark id="yellow">yellow box</mark> for the year means the
              correct player is within 5 years
            </li>
            <li>
              A <mark id="yellow">yellow box</mark> for the position means the
              correct player is on the same unit
            </li>
            <li>
              A <mark id="yellow">yellow box</mark> for the round means the
              correct player is within 2 rounds
            </li>
            <li>
              A <mark id="yellow">yellow box</mark> on the picks means the
              correct player is within 20 picks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Help;
