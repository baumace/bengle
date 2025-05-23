import { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SettingsIcon from '@mui/icons-material/Settings'
import { Era } from '../../models/Era'
import { Button, IconButton } from '../button/Button'
import { clsx } from 'clsx'
import PopUp from './PopUp'

interface SettingsPopUpProps {
    setNewPlayer: () => void
    resetGame: () => void
    selectedEra: Era
    setSelectedEra: (era: Era) => void
}

function SettingsPopUp({
    setNewPlayer: selectNewPlayer,
    resetGame,
    selectedEra,
    setSelectedEra,
}: SettingsPopUpProps) {
    const [dropdownActive, setDropdownActive] = useState(false)
    const [isVisible, setVisibility] = useState(false)

    enum ExitClickSource {
        NEW_PLAYER,
        RESET_BOARD,
        OTHER,
    }

    function handleExitingClick(source?: ExitClickSource) {
        if (source === ExitClickSource.NEW_PLAYER) {
            selectNewPlayer()
        } else if (source === ExitClickSource.RESET_BOARD) {
            resetGame()
        }

        setDropdownActive(false)
        setVisibility(false)
    }

    function EraDropdown() {
        const handleDropdownClick = () => {
            setDropdownActive(!dropdownActive)
        }

        function handleDropdownItemClick(era: Era) {
            setSelectedEra(era)
            handleDropdownClick()
        }

        const EraDropdownItem = ({ era }: { era: Era }) => {
            return (
                <div
                    className="w-full text-md hover:bg-orange/10"
                    onClick={() => handleDropdownItemClick(era)}
                >
                    <p className="p-1">{era}</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-[2fr_1.5fr_1fr] gap-4 text-orange">
                <p className="font-extrabold">Selected Years:</p>
                <div>
                    <div
                        className={clsx(
                            'border-2 border-black bg-white hover:bg-orange/10',
                            dropdownActive
                                ? 'rounded-tl-lg rounded-tr-lg'
                                : 'rounded-lg'
                        )}
                        onClick={() => handleDropdownClick()}
                    >
                        <p className="p-1">{selectedEra}</p>
                    </div>
                    <div
                        className={clsx(
                            'border-2 border-black border-t-0 bg-white rounded-bl-lg rounded-br-lg',
                            dropdownActive ? 'visible' : 'hidden'
                        )}
                    >
                        <EraDropdownItem era={Era.ALL} />
                        <EraDropdownItem era={Era.TWO_THOUSAND_TENS} />
                        <EraDropdownItem era={Era.TWO_THOUSAND} />
                        <EraDropdownItem era={Era.NINETIES} />
                        <EraDropdownItem era={Era.EIGHTIES} />
                        <EraDropdownItem era={Era.SEVENTIES} />
                    </div>
                </div>
                {dropdownActive ? (
                    <KeyboardArrowUpIcon
                        onClick={() => handleDropdownClick()}
                    />
                ) : (
                    <KeyboardArrowDownIcon
                        onClick={() => handleDropdownClick()}
                    />
                )}
            </div>
        )
    }

    return (
        <>
            <IconButton fn={() => setVisibility(true)}>
                <SettingsIcon />
            </IconButton>
            <PopUp isVisible={isVisible} setIsVisible={setVisibility}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            text="new player"
                            fn={() =>
                                handleExitingClick(ExitClickSource.NEW_PLAYER)
                            }
                        />
                        <Button
                            text="reset board"
                            fn={() =>
                                handleExitingClick(ExitClickSource.RESET_BOARD)
                            }
                        />
                    </div>
                    <EraDropdown />
                </div>
            </PopUp>
        </>
    )
}

export default SettingsPopUp
