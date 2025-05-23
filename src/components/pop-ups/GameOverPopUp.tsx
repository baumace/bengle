import { clsx } from 'clsx'
import { Player } from '../../models/Player'
import PopUp from './PopUp'

interface GameOverPopUpProps {
    gameOver: { guessedPlayer: boolean }
    currAttempt: number
    correctPick: Player
    popupActive: boolean
    setPopupActive: (state: boolean) => void
}

function GameOverPopUp({
    gameOver,
    currAttempt,
    correctPick,
    popupActive,
    setPopupActive,
}: GameOverPopUpProps) {
    function WinScreen() {
        return (
            <div>
                <p>Draft grade: A+</p>
                <p>
                    You guessed the correct player in {currAttempt - 1}{' '}
                    selections!
                </p>
            </div>
        )
    }

    function LoseScreen() {
        return (
            <div>
                <p>
                    Draft bust! You were not able to select the correct player.
                </p>
            </div>
        )
    }

    return (
        <PopUp isVisible={popupActive} setIsVisible={setPopupActive}>
            <div className="font-lg">
                {gameOver.guessedPlayer ? <WinScreen /> : <LoseScreen />}
                <p>
                    The correct player is {correctPick.name},{' '}
                    {correctPick.position} from {correctPick.college}.
                </p>
                <p>
                    Selected with the #{correctPick.pick} overall pick in round{' '}
                    {correctPick.round} of the {correctPick.year} NFL Draft
                </p>
            </div>
        </PopUp>
    )
}

export default GameOverPopUp
