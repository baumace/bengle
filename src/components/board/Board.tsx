import { Player } from '@/types/Player'
import clsx from 'clsx'

interface BoardProps {
    board: Player[]
    correctPlayer: Player
}

function Board({ board, correctPlayer }: BoardProps) {
    enum CellStatus {
        CORRECT,
        ALMOST,
        INCORRECT,
    }

    return (
        <div className="w-full grid grid-cols-[3fr_3fr_1fr_1fr_1fr_1fr] gap-3">
            <>
                <LabelCell text="name" />
                <LabelCell text="college" />
                <LabelCell text="year" />
                <LabelCell text="pos" />
                <LabelCell text="rnd" />
                <LabelCell text="pick" />
            </>
            {board.map((player) => (
                <>
                    <PlayerCell
                        text={player.name}
                        status={getNameCellStatus(player.name)}
                    />
                    <PlayerCell
                        text={player.college}
                        status={getCollegeCellStatus(player.college)}
                    />
                    <PlayerCell
                        text={player.year.toString()}
                        status={getYearCellStatus(player.year)}
                    />
                    <PlayerCell
                        text={player.position}
                        status={getPositionCellStatus(player.position)}
                    />
                    <PlayerCell
                        text={player.round.toString()}
                        status={getRoundCellStatus(player.round)}
                    />
                    <PlayerCell
                        text={player.pick.toString()}
                        status={getPickCellStatus(player.pick)}
                    />
                </>
            ))}
        </div>
    )

    function LabelCell({ text }: CellProps) {
        return (
            <div className="text-sm text-orange p-1 font-extrabold uppercase border-b">
                {text}
            </div>
        )
    }

    function PlayerCell({ text, status }: CellProps) {
        return (
            <div
                className={clsx(
                    'text-lg font-bold py-1 border rounded-lg',
                    status === CellStatus.CORRECT &&
                        'bg-green-300 dark:bg-green-700',
                    status === CellStatus.ALMOST &&
                        'bg-yellow-200 dark:bg-yellow-600'
                )}
            >
                {text}
            </div>
        )
    }

    function getNameCellStatus(name: string): CellStatus {
        return name === correctPlayer.name
            ? CellStatus.CORRECT
            : CellStatus.INCORRECT
    }

    function getCollegeCellStatus(college: string): CellStatus {
        return college === correctPlayer.college
            ? CellStatus.CORRECT
            : CellStatus.INCORRECT
    }

    function getYearCellStatus(year: number): CellStatus {
        if (year === correctPlayer.year) {
            return CellStatus.CORRECT
        } else if (Math.abs(correctPlayer.year - year) <= 5) {
            return CellStatus.ALMOST
        }
        return CellStatus.INCORRECT
    }

    function getPositionCellStatus(position: string): CellStatus {
        const POSITIONS = {
            OFFENSE: ['QB', 'RB', 'T', 'G', 'C', 'OL', 'TE', 'WR', 'FB'],
            DEFENSE: [
                'DT',
                'DE',
                'LB',
                'OLB',
                'ILB',
                'CB',
                'DB',
                'S',
                'SAF',
                'NT',
            ],
            SPECIAL_TEAMS: ['K', 'P', 'LS'],
        }

        if (position === correctPlayer.position) {
            return CellStatus.CORRECT
        } else if (
            (POSITIONS.OFFENSE.includes(position) &&
                POSITIONS.OFFENSE.includes(correctPlayer.position)) ||
            (POSITIONS.DEFENSE.includes(position) &&
                POSITIONS.DEFENSE.includes(correctPlayer.position)) ||
            (POSITIONS.SPECIAL_TEAMS.includes(position) &&
                POSITIONS.SPECIAL_TEAMS.includes(correctPlayer.position))
        ) {
            return CellStatus.ALMOST
        }
        return CellStatus.INCORRECT
    }

    function getRoundCellStatus(round: number): CellStatus {
        if (round === correctPlayer.round) {
            return CellStatus.CORRECT
        } else if (Math.abs(correctPlayer.round - round) <= 2) {
            return CellStatus.ALMOST
        }
        return CellStatus.INCORRECT
    }

    function getPickCellStatus(pick: number): CellStatus {
        if (pick === correctPlayer.pick) {
            return CellStatus.CORRECT
        } else if (Math.abs(correctPlayer.pick - pick) <= 20) {
            return CellStatus.ALMOST
        }
        return CellStatus.INCORRECT
    }
    interface CellProps {
        text: string
        status?: CellStatus
    }
}

export default Board
