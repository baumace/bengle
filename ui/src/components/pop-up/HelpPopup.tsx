import { PopupType } from "@/types/Popup"
import Popup from "./Popup"

interface HelpPopupProps {
    activePopup: PopupType
    setActivePopup: (popup: PopupType) => void
}

export function HelpPopup({ activePopup, setActivePopup }: HelpPopupProps) {
    return (
        <Popup
            isVisible={activePopup === PopupType.HELP}
            setActivePopup={setActivePopup}
        >
            <div className="font-lg">
                <ul>
                    <li className="p-2">
                        Your goal is to select the correct player whose name
                        was on a Bengal's draft card
                    </li>
                    <li className="p-2">
                        You have 7 selections to make the correct pick and
                        find your draft gem
                    </li>
                    <li className="p-2">
                        A{' '}
                        <mark className="bg-green-300 dark:bg-green-700">
                            green box
                        </mark>{' '}
                        means that the information is correct
                    </li>
                    <li className="p-2">
                        A{' '}
                        <mark className="bg-yellow-200 dark:bg-yellow-600">
                            yellow box
                        </mark>{' '}
                        for the year means the correct player is within 5
                        years
                    </li>
                    <li className="p-2">
                        A{' '}
                        <mark className="bg-yellow-200 dark:bg-yellow-600">
                            yellow box
                        </mark>{' '}
                        for the position means the correct player is on the
                        same unit
                    </li>
                    <li className="p-2">
                        A{' '}
                        <mark className="bg-yellow-200 dark:bg-yellow-600">
                            yellow box
                        </mark>{' '}
                        for the round means the correct player is within 2
                        rounds
                    </li>
                    <li className="p-2">
                        A{' '}
                        <mark className="bg-yellow-200 dark:bg-yellow-600">
                            yellow box
                        </mark>{' '}
                        on the picks means the correct player is within 20
                        picks
                    </li>
                </ul>
            </div>
        </Popup>
    )
}
