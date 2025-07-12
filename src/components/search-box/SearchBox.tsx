import { useCallback, useEffect, useState } from 'react'
import { Player } from '@/types/Player'
import clsx from 'clsx'

const STARTING_INDEX = -1
const EMPTY_STRING = ''

interface SearchBoxProps {
    placeholder: string
    data: Player[]
    disabled: boolean
    selectPlayer: (value: Player) => void
}

function SearchBox({
    placeholder,
    data,
    disabled,
    selectPlayer,
}: SearchBoxProps) {
    const [autofillOptions, setAutofillOptions] = useState<Player[]>([])
    const [autofillOptionIndex, setAutofillOptionIndex] =
        useState(STARTING_INDEX)
    const [searchInput, setSearchInput] = useState(EMPTY_STRING)

    useEffect(() => {
        let filteredAutofillOptions: Player[] = []
        setAutofillOptionIndex(STARTING_INDEX)
        if (searchInput !== EMPTY_STRING) {
            filteredAutofillOptions = data.filter((value) =>
                value.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        }
        setAutofillOptions(filteredAutofillOptions)
    }, [searchInput, data])

    const handlePlayerSelection = useCallback(
        (value: Player) => {
            selectPlayer(value)

            // reset to initial state
            setAutofillOptions(autofillOptions.slice(0, 0))
            setSearchInput(EMPTY_STRING)
            setAutofillOptionIndex(STARTING_INDEX)
        },
        [selectPlayer, autofillOptions]
    )

    const handleKeyboard = useCallback(
        (event: KeyboardEvent) => {
            if (autofillOptions.length > 0) {
                if (
                    event.key === 'Enter' &&
                    autofillOptionIndex !== STARTING_INDEX
                ) {
                    handlePlayerSelection(autofillOptions[autofillOptionIndex])
                } else if (event.key === 'ArrowDown') {
                    event.preventDefault()

                    // handle edge case to loop back to search text
                    if (autofillOptionIndex === autofillOptions.length - 1) {
                        setAutofillOptionIndex(STARTING_INDEX)
                    } else {
                        setAutofillOptionIndex(
                            (autofillOptionIndex + 1) % autofillOptions.length
                        )
                    }
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault()

                    // handle edge case to loop from search text to last option and loop back to search text
                    if (autofillOptionIndex === STARTING_INDEX) {
                        setAutofillOptionIndex(autofillOptions.length - 1)
                    } else if (autofillOptionIndex === STARTING_INDEX + 1) {
                        setAutofillOptionIndex(STARTING_INDEX)
                    } else {
                        setAutofillOptionIndex(
                            (autofillOptionIndex - 1) % autofillOptions.length
                        )
                    }
                }
            }
        },
        [autofillOptions, autofillOptionIndex, handlePlayerSelection]
    )

    // Add the event listener for the keyboard
    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard)

        return () => {
            document.removeEventListener('keydown', handleKeyboard)
        }
    }, [handleKeyboard])

    return (
        <div className="relative w-full">
            <input
                type="text"
                className={clsx(
                    'bg-white dark:bg-zinc-900 w-full border text-lg text-orange p-2 focus:outline-none placeholder:text-orange/50',
                    autofillOptions.length !== 0
                        ? 'rounded-tr-lg rounded-tl-lg'
                        : 'rounded-lg'
                )}
                value={
                    autofillOptionIndex === STARTING_INDEX
                        ? searchInput
                        : autofillOptions[autofillOptionIndex].name
                }
                placeholder={placeholder}
                onChange={(event) => setSearchInput(event.target.value)}
                disabled={disabled}
            />
            {autofillOptions.length > 0 && (
                <div className="absolute w-full text-lg text-left text-orange bg-white dark:bg-zinc-900 border border-t-0 overflow-scroll max-h-[250px] rounded-bl-lg rounded-br-lg">
                    {autofillOptions.map((player, index) => {
                        return (
                            <div
                                className={clsx(
                                    'p-3 hover:bg-orange/10 cursor-pointer',
                                    autofillOptionIndex === index &&
                                        'bg-orange/10'
                                )}
                                onClick={() => handlePlayerSelection(player)}
                                key={index}
                            >
                                <p>{player.name}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBox
