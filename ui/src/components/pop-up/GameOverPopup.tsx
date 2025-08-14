import { UseGameReturn } from "@/hooks/useGame";
import { PopupType } from "@/types/Popup";
import Popup from "./Popup";

interface GameOverPopUpProps {
    game: UseGameReturn
    activePopup: PopupType
    setActivePopup: (popup: PopupType) => void
}

export function GameOverPopup({ game, activePopup, setActivePopup }: GameOverPopUpProps) {
    if (!game.correctPlayer) return null;

    return (
        <Popup
            isVisible={activePopup === PopupType.GAME_OVER}
            setActivePopup={setActivePopup}
        >
            <div className="font-lg">
                {game.correctPlayerGuessed ? (
                    <div>
                        <p>Draft grade: A+</p>
                        <p>
                            You guessed the correct player in {game.currAttempt}{' '}
                            selections!
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>Draft bust!</p>
                        <p>
                            You were not able to select the correct player.
                        </p>
                    </div>
                )}
                <p>
                    The correct player is {game.correctPlayer.name},{' '}
                    {game.correctPlayer.position} from {game.correctPlayer.college}
                </p>
                <p>
                    Selected with pick #{game.correctPlayer.pick} in round{' '}
                    {game.correctPlayer.round} of the {game.correctPlayer.year} NFL
                    Draft
                </p>
            </div>
        </Popup>
    )
}