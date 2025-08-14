import { PopupType } from "@/types/Popup"
import Popup from "./Popup"
import { Button } from "../button/Button"
import { UseGameReturn } from "@/hooks/useGame"
import { Dropdown, DropdownItem } from "../dropdown/Dropdown"
import { Era } from "@/types/Era"

interface SettingsPopupProps {
    game: UseGameReturn
    activePopup: PopupType
    setActivePopup: (popup: PopupType) => void
    selectedEra: Era
    setSelectedEra: (era: Era) => void
}

export function SettingsPopup({ game, activePopup, setActivePopup, selectedEra, setSelectedEra }: SettingsPopupProps) {
    return (
        <Popup
            isVisible={activePopup === PopupType.SETTINGS}
            setActivePopup={setActivePopup}
        >
            <div className="grid grid-cols-1 gap-2 place-items-center justify-items-center">
                <Button
                    fn={() => {
                        game.setNewPlayer()
                        setActivePopup(PopupType.NONE)
                    }}
                >
                    new player
                </Button>
                <Button
                    fn={() => {
                        game.resetGame()
                        setActivePopup(PopupType.NONE)
                    }}
                >
                    reset board
                </Button>
                <Dropdown text={selectedEra}>
                    <DropdownItem fn={() => setSelectedEra(Era.ALL)}>
                        {Era.ALL}
                    </DropdownItem>
                    <DropdownItem
                        fn={() => setSelectedEra(Era.TWO_THOUSAND_TENS)}
                    >
                        {Era.TWO_THOUSAND_TENS}
                    </DropdownItem>
                    <DropdownItem
                        fn={() => setSelectedEra(Era.TWO_THOUSAND)}
                    >
                        {Era.TWO_THOUSAND}
                    </DropdownItem>
                    <DropdownItem fn={() => setSelectedEra(Era.NINETIES)}>
                        {Era.NINETIES}
                    </DropdownItem>
                    <DropdownItem fn={() => setSelectedEra(Era.EIGHTIES)}>
                        {Era.EIGHTIES}
                    </DropdownItem>
                    <DropdownItem fn={() => setSelectedEra(Era.SEVENTIES)}>
                        {Era.SEVENTIES}
                    </DropdownItem>
                </Dropdown>
            </div>
        </Popup>
    )
}
