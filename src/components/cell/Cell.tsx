import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Cell.css";

interface CellProps {
  infoIdentifier: number;
  attemptVal: number;
  board: Array<Array<any>>;
  correctPick: Player;
  currAttempt: number;
}

function Cell({ infoIdentifier, attemptVal, board, correctPick, currAttempt }: CellProps) {
  const cellInfo = board[attemptVal][infoIdentifier];

  // Variables to store cellInfo descriptions
  let cellID = "",
    isCorrect = false,
    isAlmost = false,
    tooHigh = false,
    tooLow = false,
    isBig = false,
    isHeader = false;

  // Is the cell a big cell (containing name or college)
  isBig = infoIdentifier < 2;

  // Is the row the header row?
  isHeader = attemptVal === 0;

  // Is the cell empty?
  let isEmpty = attemptVal >= currAttempt;

  // If row is not a header nor empty, check the cell's info
  if (!isHeader && !isEmpty) {
    // Check the info depending on what is expected to be in the cell
    switch (infoIdentifier) {
      // Player Name
      case 0:
        // Is the user guessed player correct?
        isCorrect = correctPick.name === cellInfo;
        break;

      // College
      case 1:
        // Is the user guessed college correct?
        isCorrect = correctPick.college === cellInfo;
        break;

      // Draft Year
      case 2:
        // Is the user guessed draft year correct?
        isCorrect = correctPick.year === cellInfo;

        // Was the guess incorrect?
        if (!isCorrect) {
          // What is the difference between the correct year and the user guessed year
          const diff = correctPick.year - cellInfo;

          // Is the difference within 5 years?
          isAlmost = diff <= 5 && diff >= -5;

          // Is the user guessed year greater the the correct year?
          tooHigh = diff < 0;
          tooLow = !tooHigh;
        }

        break;

      // Position
      case 3:
        // Is the user guessed position correct?
        isCorrect = correctPick.position === cellInfo;

        // Was the guess incorrect?
        if (!isCorrect) {
          // Holds possible offensive positions
          const offense = ["QB", "RB", "T", "G", "C", "OL", "TE", "WR", "FB"];

          // Holds possible defensive positions
          const defense = [
            "DT",
            "DE",
            "LB",
            "OLB",
            "ILB",
            "CB",
            "DB",
            "S",
            "SAF",
            "NT",
          ];

          // Holds possible special teams positions
          const special = ["K", "P", "LS"];

          // The correct position
          const correctPos = correctPick.position;

          // Is the correct position on offense?
          if (offense.includes(correctPos)) {
            // Is the guessed position also on offense? (in the same group)
            isAlmost = offense.includes(cellInfo);
          } // Is the correct position on defense?
          else if (defense.includes(correctPos)) {
            // Is the guessed position also on defense? (in the same group)
            isAlmost = defense.includes(cellInfo);
          } // The correct position must be on special teams
          else {
            // Is the guessed position also on special teams? (in the same group)
            isAlmost = special.includes(cellInfo);
          }
        }

        break;

      // Draft Round
      case 4:
        // Is the guessed round correct?
        isCorrect = correctPick.round === cellInfo;

        // Was the guess correct?
        if (!isCorrect) {
          // What is the difference between the correct round and the user guessed round?
          const diff = correctPick.round - cellInfo;

          // Is the difference within 2 rounds?
          isAlmost = diff <= 2 && diff >= -2;

          // Is the user guessed round lower than the correct round?
          tooHigh = diff < 0;
          tooLow = !tooHigh;
        }

        break;

      // Draft Pick
      case 5:
        // Is the user guessed pick correct?
        isCorrect = correctPick.pick === cellInfo;
        if (!isCorrect) {
          // What is the difference between the correct pick and the user guessed pick?
          const diff = correctPick.pick - cellInfo;

          // Is the difference within 20 picks?
          isAlmost = diff <= 20 && diff >= -20;

          // Is the user guessed pick lower than the correct pick?
          tooHigh = diff < 0;
          tooLow = !tooHigh;
        }

        break;
    }
  }

  // Change the cellID depending on cellInfo descriptions
  // Is the cell empty?
  if (isEmpty) {
    cellID = "empty";
  } else {
    // Is the cell big?
    if (isBig) {
      cellID = "big";
    } else {
      cellID = "small";
    }

    // Is the cell a header?
    if (isHeader) {
      cellID += "h";
    } else {
      // No so the cell contains info
      // Is the user guess correct?
      if (isCorrect) {
        cellID += "c";
      } // Is the user guess almost correct?
      else if (isAlmost) {
        cellID += "a";
      }
    }
  }
  /*
   * Inside of the return statement, the conditional
   * determines if an arrow is also placed inside of
   * the cell or not. If an arrow should be placed,
   * the conditional determines if the arrow points
   * up or down based on the user guess.
   */
  return (
    <div className="cell" id={cellID}>
      {tooHigh ? (
        <div>
          <p className="textInfo" id="almostText">
            {cellInfo}{" "}
          </p>
          <KeyboardArrowDownIcon
            className="cellArrow"
            id={"almostArrow" + infoIdentifier}
          />
        </div>
      ) : tooLow ? (
        <div>
          <p className="textInfo" id="almostText">
            {cellInfo}{" "}
          </p>
          <KeyboardArrowUpIcon
            className="cellArrow"
            id={"almostArrow" + infoIdentifier}
          />
        </div>
      ) : (
        <div>
          <p className="textInfo">{cellInfo} </p>
        </div>
      )}
    </div>
  );
}

export default Cell;
