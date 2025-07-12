'use client'

import { ReactNode, useEffect, useState } from 'react'
import draftPicks from '@/data/DraftPicks.json'
import { Era, filterPlayersByEra } from '@/types/Era'
import { Player } from '@/types/Player'
import { clsx } from 'clsx'
import Board from '@/components/board/Board'
import SearchBox from '@/components/search-box/SearchBox'
import { Button, IconButton } from '@/components/button/Button'
import PopUp from '@/components/pop-up/PopUp'
import { Dropdown, DropdownItem } from '@/components/dropdown/Dropdown'
import Tooltip from '@/components/tooltip/Tooltip'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'

const MAX_ATTEMPTS = 7
const INITIAL_ATTEMPT = 0

function App() {
    const [picksArray, setPicksArray] = useState<Player[]>(draftPicks)

    // game state
    const [board, setBoard] = useState<Player[]>([])
    const [currAttempt, setCurrAttempt] = useState<number>(INITIAL_ATTEMPT)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [correctPlayerGuessed, setCorrectPlayerGuessed] =
        useState<boolean>(false)
    const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL)
    const [correctPlayer, setCorrectPlayer] = useState<Player>(
        draftPicks[Math.floor(Math.random() * draftPicks.length)]
    )

    // pop-ups
    const [isGameOverPopupActive, setGameOverPopupActive] = useState(false)
    const [isHelpPopupActive, setHelpPopupActive] = useState(false)
    const [isSettingsPopupActive, setSettingsPopupActive] = useState(false)
    const [isReferencesPopupActive, setReferencesPopupActive] = useState(false)

    useEffect(() => {
        if (currAttempt === MAX_ATTEMPTS && !gameOver) {
            setGameOver(true)
            setCorrectPlayerGuessed(false)
            setGameOverPopupActive(true)
        }
    }, [currAttempt, gameOver])

    useEffect(() => {
        resetGame()
    }, [correctPlayer])

    useEffect(() => {
        setPicksArray(
            draftPicks.filter((player) =>
                filterPlayersByEra(player, selectedEra)
            )
        )
    }, [selectedEra])

    function selectPlayer(player: Player) {
        setBoard([...board, player])

        if (player === correctPlayer) {
            setGameOver(true)
            setCorrectPlayerGuessed(true)
            setGameOverPopupActive(true)
        }

        setCurrAttempt(currAttempt + 1)
    }

    function resetGame() {
        setBoard([])
        setCurrAttempt(INITIAL_ATTEMPT)
        setGameOver(false)
        setCorrectPlayerGuessed(false)
    }

    function setNewPlayer() {
        setCorrectPlayer(
            picksArray[Math.floor(Math.random() * picksArray.length)]
        )
    }

    return (
        <div className="font-mono text-center h-dvh w-dvw bg-white dark:bg-zinc-900 text-black dark:text-white/80 [&_*]:border-black/20 [&_*]:dark:border-white/20">
            <header className="absolute left-12 top-6 grid grid-cols-3 gap-2">
                <Tooltip content="References">
                    <IconButton fn={() => setReferencesPopupActive(true)}>
                        <BookOpenIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Help">
                    <IconButton fn={() => setHelpPopupActive(true)}>
                        <InformationCircleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Settings">
                    <IconButton fn={() => setSettingsPopupActive(true)}>
                        <Cog6ToothIcon />
                    </IconButton>
                </Tooltip>
            </header>
            <main className="mx-[20%] pt-6 grid grid-cols-1 gap-8">
                <div>
                    <div className="font-extrabold text-4xl">BENGLE</div>
                    <div className="font-semibold text-md">
                        Bengals' Draft Day Selections
                    </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-2">
                    <Button
                        fn={() => {
                            setGameOver(true)
                            setCorrectPlayerGuessed(false)
                            setGameOverPopupActive(true)
                        }}
                        classes={clsx(
                            gameOver ? 'hidden' : 'visible',
                            'justify-self-end place-self-center'
                        )}
                    >
                        give up
                    </Button>
                    <Button
                        fn={() => setNewPlayer()}
                        classes={clsx(
                            gameOver ? 'visible' : 'hidden',
                            'justify-self-end place-self-center'
                        )}
                    >
                        new player
                    </Button>
                    <SearchBox
                        placeholder={
                            gameOver
                                ? 'Game Over'
                                : `Selection ${currAttempt + 1} of ${MAX_ATTEMPTS}`
                        }
                        data={picksArray}
                        disabled={gameOver}
                        selectPlayer={selectPlayer}
                    />
                    <Button
                        fn={() => setGameOverPopupActive(true)}
                        classes={clsx(
                            gameOver ? 'visible' : 'hidden',
                            'justify-self-start place-self-center'
                        )}
                    >
                        show results
                    </Button>
                </div>
                <Board board={board} correctPlayer={correctPlayer} />
            </main>
            <footer>
                <HelpPopUp />
                <SettingsPopUp />
                <ReferencesPopUp />
                <GameOverPopUp />
            </footer>
        </div>
    )

    function HelpPopUp() {
        return (
            <PopUp
                isVisible={isHelpPopupActive}
                setIsVisible={setHelpPopupActive}
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
            </PopUp>
        )
    }

    function SettingsPopUp() {
        return (
            <PopUp
                isVisible={isSettingsPopupActive}
                setIsVisible={setSettingsPopupActive}
            >
                <div className="grid grid-cols-1 gap-2 place-items-center justify-items-center">
                    <Button
                        fn={() => {
                            setNewPlayer()
                            setSettingsPopupActive(false)
                        }}
                    >
                        new player
                    </Button>
                    <Button
                        fn={() => {
                            resetGame()
                            setSettingsPopupActive(false)
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
            </PopUp>
        )
    }

    function ReferencesPopUp() {
        interface LinkProps {
            href: string
            children?: ReactNode
        }

        function Link({ href, children }: LinkProps) {
            return (
                <a
                    className="place-self-start text-orange"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {children}
                </a>
            )
        }

        interface LabelProps {
            children?: ReactNode
        }

        function Label({ children }: LabelProps) {
            return <div className="place-self-end">{children}</div>
        }

        return (
            <PopUp
                isVisible={isReferencesPopupActive}
                setIsVisible={setReferencesPopupActive}
            >
                <div className="font-lg grid grid-cols-[1fr_2fr] gap-1 w-fit">
                    <Label>Inspired By:</Label>
                    <Link href="https://poeltl.dunk.town/">Poeltl</Link>
                    <Label>Source Code:</Label>
                    <Link href="https://github.com/baumace/bengle">
                        github.com/baumace/bengle
                    </Link>
                </div>
            </PopUp>
        )
    }

    function GameOverPopUp() {
        return (
            <PopUp
                isVisible={isGameOverPopupActive}
                setIsVisible={setGameOverPopupActive}
            >
                <div className="font-lg">
                    {correctPlayerGuessed ? (
                        <div>
                            <p>Draft grade: A+</p>
                            <p>
                                You guessed the correct player in {currAttempt}{' '}
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
                        The correct player is {correctPlayer.name},{' '}
                        {correctPlayer.position} from {correctPlayer.college}
                    </p>
                    <p>
                        Selected with pick #{correctPlayer.pick} in round{' '}
                        {correctPlayer.round} of the {correctPlayer.year} NFL
                        Draft
                    </p>
                </div>
            </PopUp>
        )
    }
}

export default App
