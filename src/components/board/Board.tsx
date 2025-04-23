import Cell from "../cell/Cell";

interface BoardProps {
  board: Array<Array<any>>;
  correctPick: Player;
  currentAttempt: number;
}

function Board({ board, correctPick, currentAttempt }: BoardProps) {
  /*
   * Returns a complete row of 6 cells to contain information.
   */
  function row(attemptNum: number) {
    return (
      <div className="row">
        <Cell infoIdentifier={0} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
        <Cell infoIdentifier={1} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
        <Cell infoIdentifier={2} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
        <Cell infoIdentifier={3} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
        <Cell infoIdentifier={4} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
        <Cell infoIdentifier={5} attemptVal={attemptNum} board={board} correctPick={correctPick} currAttempt={currentAttempt} />
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
