import { Player } from '../../models/Player'
import clsx from 'clsx'

interface BoardProps {
    board: Player[]
    correctPick: Player
}

function Board({ board, correctPick }: BoardProps) {
    const POSITIONS = {
        OFFENSE: ['QB', 'RB', 'T', 'G', 'C', 'OL', 'TE', 'WR', 'FB'],
        DEFENSE: ['DT', 'DE', 'LB', 'OLB', 'ILB', 'CB', 'DB', 'S', 'SAF', 'NT'],
        SPECIAL_TEAMS: ['K', 'P', 'LS'],
    }

    function ColumnLabels() {
        interface CellProps {
            text: string
        }

        function Cell({ text }: CellProps) {
            return (
                <div className="text-sm text-orange font-extrabold uppercase border-b border-black">
                    {text}
                </div>
            )
        }

        return (
            <>
                <Cell text="name" />
                <Cell text="college" />
                <Cell text="year" />
                <Cell text="pos" />
                <Cell text="rnd" />
                <Cell text="pick" />
            </>
        )
    }

    interface RowProps {
        guessedPlayer: Player
        correctPlayer: Player
    }

    function Row({ guessedPlayer, correctPlayer }: RowProps) {
        enum CellStatus {
            CORRECT,
            ALMOST,
            INCORRECT,
        }

        function getNameCellStatus(
            name: string,
            expectedName: string
        ): CellStatus {
            return name === expectedName
                ? CellStatus.CORRECT
                : CellStatus.INCORRECT
        }

        function getCollegeCellStatus(
            college: string,
            expectedCollege: string
        ): CellStatus {
            return college === expectedCollege
                ? CellStatus.CORRECT
                : CellStatus.INCORRECT
        }

        function getYearCellStatus(
            year: number,
            expectedYear: number
        ): CellStatus {
            if (year === expectedYear) {
                return CellStatus.CORRECT
            } else if (Math.abs(expectedYear - year) <= 5) {
                return CellStatus.ALMOST
            }
            return CellStatus.INCORRECT
        }

        function getPositionCellStatus(
            position: string,
            expectedPosition: string
        ): CellStatus {
            if (position === expectedPosition) {
                return CellStatus.CORRECT
            } else if (
                (POSITIONS.OFFENSE.includes(position) &&
                    POSITIONS.OFFENSE.includes(expectedPosition)) ||
                (POSITIONS.DEFENSE.includes(position) &&
                    POSITIONS.DEFENSE.includes(expectedPosition)) ||
                (POSITIONS.SPECIAL_TEAMS.includes(position) &&
                    POSITIONS.SPECIAL_TEAMS.includes(expectedPosition))
            ) {
                return CellStatus.ALMOST
            }
            return CellStatus.INCORRECT
        }

        function getRoundCellStatus(
            round: number,
            expectedRound: number
        ): CellStatus {
            if (round === expectedRound) {
                return CellStatus.CORRECT
            } else if (Math.abs(expectedRound - round) <= 2) {
                return CellStatus.ALMOST
            }
            return CellStatus.INCORRECT
        }

        function getPickCellStatus(
            pick: number,
            expectedPick: number
        ): CellStatus {
            if (pick === expectedPick) {
                return CellStatus.CORRECT
            } else if (Math.abs(expectedPick - pick) <= 20) {
                return CellStatus.ALMOST
            }
            return CellStatus.INCORRECT
        }
        interface CellProps {
            text: string
            status: CellStatus
        }

        function Cell({ text, status }: CellProps) {
            return (
                <div
                    className={clsx(
                        'text-lg text-black border border-black rounded-lg',
                        status === CellStatus.CORRECT && 'bg-green-300',
                        status === CellStatus.ALMOST && 'bg-yellow-200'
                    )}
                >
                    {text}
                </div>
            )
        }

        return (
            <>
                <Cell
                    text={guessedPlayer.name}
                    status={getNameCellStatus(
                        guessedPlayer.name,
                        correctPlayer.name
                    )}
                />
                <Cell
                    text={guessedPlayer.college}
                    status={getCollegeCellStatus(
                        guessedPlayer.college,
                        correctPick.college
                    )}
                />
                <Cell
                    text={guessedPlayer.year.toString()}
                    status={getYearCellStatus(
                        guessedPlayer.year,
                        correctPlayer.year
                    )}
                />
                <Cell
                    text={guessedPlayer.position}
                    status={getPositionCellStatus(
                        guessedPlayer.position,
                        correctPlayer.position
                    )}
                />
                <Cell
                    text={guessedPlayer.round.toString()}
                    status={getRoundCellStatus(
                        guessedPlayer.round,
                        correctPlayer.round
                    )}
                />
                <Cell
                    text={guessedPlayer.pick.toString()}
                    status={getPickCellStatus(
                        guessedPlayer.pick,
                        correctPlayer.pick
                    )}
                />
            </>
        )
    }

    return (
        <div className="absolute w-full bottom-[5%] grid grid-cols-[3fr_3fr_1fr_1fr_1fr_1fr] gap-3">
            <ColumnLabels />
            {board.map((player, index) => (
                <Row
                    key={index}
                    guessedPlayer={player}
                    correctPlayer={correctPick}
                />
            ))}
        </div>
    )
}

export default Board
