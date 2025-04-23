import React from "react";
import Cell from "../cell/Cell";

/*
 * Creates the 8 row by 6 cell board that will display the information of the game.
 */
function Board() {
  /*
   * Returns a complete row of 6 cells to contain information.
   */
  function row(attemptNum) {
    return (
      <div className="row">
        <Cell infoIdentifier={0} attemptVal={attemptNum} />
        <Cell infoIdentifier={1} attemptVal={attemptNum} />
        <Cell infoIdentifier={2} attemptVal={attemptNum} />
        <Cell infoIdentifier={3} attemptVal={attemptNum} />
        <Cell infoIdentifier={4} attemptVal={attemptNum} />
        <Cell infoIdentifier={5} attemptVal={attemptNum} />
      </div>
    );
  }

  /*
 ``* Return the board with 8 rows.
   */
  return (
    <div className="board">
      {row(0)}
      {row(1)}
      {row(2)}
      {row(3)}
      {row(4)}
      {row(5)}
      {row(6)}
      {row(7)}
    </div>
  );
}

export default Board;
