import { Player } from '../../models/Player'
import './Board.css'

const POSITIONS = {
    OFFENSE: ['QB', 'RB', 'T', 'G', 'C', 'OL', 'TE', 'WR', 'FB'],
    DEFENSE: ['DT', 'DE', 'LB', 'OLB', 'ILB', 'CB', 'DB', 'S', 'SAF', 'NT'],
    ST: ['K', 'P', 'LS'],
}

interface BoardProps {
    board: Player[]
    correctPick: Player
}

function Board({ board, correctPick }: BoardProps) {
    interface RowProps {
        guessedPlayer: Player
        correctPlayer: Player
    }

    function Row({ guessedPlayer, correctPlayer }: RowProps) {
        function buildNameStyleId(name: string): string {
            let id = 'big'
            if (name === correctPlayer.name) {
                id = `${id}c`
            }
            return id
        }

        function buildCollegeStyleId(college: string): string {
            let id = 'big'
            if (college === correctPlayer.college) {
                id = `${id}c`
            }
            return id
        }

        function buildYearStyleId(year: number): string {
            let id = 'small'
            if (year === correctPlayer.year) {
                id = `${id}c`
            } else if (Math.abs(correctPlayer.year - year) <= 5) {
                id = `${id}a`
            }
            return id
        }

        function buildPositionStyleId(position: string): string {
            let id = 'small'
            if (position === correctPlayer.position) {
                id = `${id}c`
            } else if (
                POSITIONS.OFFENSE.includes(position) &&
                POSITIONS.OFFENSE.includes(correctPlayer.position)
            ) {
                id = `${id}a`
            } else if (
                POSITIONS.DEFENSE.includes(position) &&
                POSITIONS.DEFENSE.includes(correctPlayer.position)
            ) {
                id = `${id}a`
            } else if (
                POSITIONS.ST.includes(position) &&
                POSITIONS.ST.includes(correctPlayer.position)
            ) {
                id = `${id}a`
            }
            return id
        }

        function buildRoundStyleId(round: number): string {
            let id = 'small'
            if (round === correctPlayer.round) {
                id = `${id}c`
            } else if (Math.abs(correctPlayer.round - round) <= 2) {
                id = `${id}a`
            }
            return id
        }

        function buildPickStyleId(pick: number): string {
            let id = 'small'
            if (pick === correctPlayer.pick) {
                id = `${id}c`
            } else if (Math.abs(correctPlayer.pick - pick) <= 20) {
                id = `${id}a`
            }
            return id
        }

        return (
            <div className="row">
                <div className="cell" id={buildNameStyleId(guessedPlayer.name)}>
                    {guessedPlayer.name}
                </div>
                <div
                    className="cell"
                    id={buildCollegeStyleId(guessedPlayer.college)}
                >
                    {guessedPlayer.college}
                </div>
                <div className="cell" id={buildYearStyleId(guessedPlayer.year)}>
                    {guessedPlayer.year}
                </div>
                <div
                    className="cell"
                    id={buildPositionStyleId(guessedPlayer.position)}
                >
                    {guessedPlayer.position}
                </div>
                <div
                    className="cell"
                    id={buildRoundStyleId(guessedPlayer.round)}
                >
                    {guessedPlayer.round}
                </div>
                <div className="cell" id={buildPickStyleId(guessedPlayer.pick)}>
                    {guessedPlayer.pick}
                </div>
            </div>
        )
    }

    return (
        <div className="board">
            <div className="row">
                <div className="cell" id="bigh">
                    NAME
                </div>
                <div className="cell" id="bigh">
                    COLLEGE
                </div>
                <div className="cell" id="smallh">
                    YEAR
                </div>
                <div className="cell" id="smallh">
                    POS
                </div>
                <div className="cell" id="smallh">
                    RND
                </div>
                <div className="cell" id="smallh">
                    PICK
                </div>
            </div>
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
