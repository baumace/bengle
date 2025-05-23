import { useState } from 'react'
import HelpIcon from '@mui/icons-material/Help'

function HelpPopUp() {
    const [isVisible, setVisibility] = useState(false)

    return (
        <>
            <button
                className="headerButton"
                id="helpButton"
                onClick={() => setVisibility(true)}
            >
                <HelpIcon className="headerButtonIcon" />
            </button>
            <div id={isVisible ? 'show' : 'hide'}>
                <div className="popupWall" />
                <div className="popup p-12 text-left">
                    <button
                        className="exitButton"
                        onClick={() => {
                            setVisibility(false)
                        }}
                    >
                        X
                    </button>
                    <div className="font-lg">
                        <ul>
                            <li className="p-2">
                                Your goal is to select the correct player whose
                                name was on a Bengal's draft card
                            </li>
                            <li className="p-2">
                                You have 7 selections to make the correct pick
                                and find your draft gem
                            </li>
                            <li className="p-2">
                                A{' '}
                                <mark className="bg-green-300">green box</mark>{' '}
                                means that the information is correct
                            </li>
                            <li className="p-2">
                                A{' '}
                                <mark className="bg-yellow-200">
                                    yellow box
                                </mark>{' '}
                                for the year means the correct player is within
                                5 years
                            </li>
                            <li className="p-2">
                                A{' '}
                                <mark className="bg-yellow-200">
                                    yellow box
                                </mark>{' '}
                                for the position means the correct player is on
                                the same unit
                            </li>
                            <li className="p-2">
                                A{' '}
                                <mark className="bg-yellow-200">
                                    yellow box
                                </mark>{' '}
                                for the round means the correct player is within
                                2 rounds
                            </li>
                            <li className="p-2">
                                A{' '}
                                <mark className="bg-yellow-200">
                                    yellow box
                                </mark>{' '}
                                on the picks means the correct player is within
                                20 picks
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpPopUp
