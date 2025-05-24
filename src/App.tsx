import './App.css'
import Board from './components/board/Board'
import SearchBox from './components/search-box/SearchBox'
import HelpIcon from '@mui/icons-material/Help'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useEffect, useState } from 'react'
import draftPicks from './data/DraftPicks.json'
import { Era, filterPlayersByEra } from './models/Era'
import { Player } from './models/Player'
import { Button, IconButton } from './components/button/Button'
import { clsx } from 'clsx'
import PopUp from './components/pop-ups/PopUp'
import { Dropdown, DropdownItem } from './components/dropdown/Dropdown'

const MAX_ATTEMPTS = 7
const INITIAL_ATTEMPT = 0

function App() {
    const [picksArray, setPicksArray] = useState<Player[]>(draftPicks)
    const [board, setBoard] = useState<Player[]>([])
    const [currAttempt, setCurrAttempt] = useState<number>(INITIAL_ATTEMPT)
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedPlayer: false,
    })
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
        if (currAttempt === MAX_ATTEMPTS && !gameOver.gameOver) {
            setGameOver({ gameOver: true, guessedPlayer: false })
            setGameOverPopupActive(true)
        }
    }, [currAttempt])

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
            setGameOver({ gameOver: true, guessedPlayer: true })
            setGameOverPopupActive(true)
        }

        setCurrAttempt(currAttempt + 1)
    }

    function resetGame() {
        setBoard([])
        setCurrAttempt(INITIAL_ATTEMPT)
        setGameOver({ gameOver: false, guessedPlayer: false })
    }

    function setNewPlayer() {
        setCorrectPlayer(
            picksArray[Math.floor(Math.random() * picksArray.length)]
        )
    }

    return (
        <div className="text-center relative h-full w-dvw">
            <div className="mx-[20%] mt-6 grid grid-cols-1 gap-8">
                <header>
                    <div className="absolute left-6 top-0 grid grid-cols-3 gap-2">
                        <IconButton fn={() => setHelpPopupActive(true)}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton fn={() => setSettingsPopupActive(true)}>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton fn={() => setReferencesPopupActive(true)}>
                            <MenuBookIcon />
                        </IconButton>
                    </div>
                    <div className="font-extrabold text-4xl">BENGLE</div>
                    <div className="font-semibold text-md">
                        Bengals' Draft Day Selections
                    </div>
                </header>
                <div className="w-full grid grid-cols-3 gap-2">
                    {gameOver.gameOver ? (
                        <Button
                            fn={() => setNewPlayer()}
                            classes="justify-self-end place-self-center"
                        >
                            new player
                        </Button>
                    ) : (
                        <Button
                            fn={() => {
                                setGameOver({
                                    gameOver: true,
                                    guessedPlayer: false,
                                })
                                setGameOverPopupActive(true)
                            }}
                            classes="justify-self-end place-self-center"
                        >
                            give up
                        </Button>
                    )}
                    <SearchBox
                        placeholder={
                            gameOver.gameOver
                                ? 'Game Over'
                                : `Selection ${currAttempt + 1} of ${MAX_ATTEMPTS}`
                        }
                        data={picksArray}
                        disabled={gameOver.gameOver}
                        selectPlayer={selectPlayer}
                    />
                    <Button
                        fn={() => setGameOverPopupActive(true)}
                        classes={clsx(
                            gameOver.gameOver ? 'visible' : 'hidden',
                            'justify-self-start place-self-center'
                        )}
                    >
                        show results
                    </Button>
                </div>
                <Board board={board} correctPlayer={correctPlayer} />{' '}
            </div>
            {/* Help pop-up */}
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
                            A <mark className="bg-green-300">green box</mark>{' '}
                            means that the information is correct
                        </li>
                        <li className="p-2">
                            A <mark className="bg-yellow-200">yellow box</mark>{' '}
                            for the year means the correct player is within 5
                            years
                        </li>
                        <li className="p-2">
                            A <mark className="bg-yellow-200">yellow box</mark>{' '}
                            for the position means the correct player is on the
                            same unit
                        </li>
                        <li className="p-2">
                            A <mark className="bg-yellow-200">yellow box</mark>{' '}
                            for the round means the correct player is within 2
                            rounds
                        </li>
                        <li className="p-2">
                            A <mark className="bg-yellow-200">yellow box</mark>{' '}
                            on the picks means the correct player is within 20
                            picks
                        </li>
                    </ul>
                </div>
            </PopUp>
            {/* Settings pop-up */}
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
            {/* References pop-up */}
            <PopUp
                isVisible={isReferencesPopupActive}
                setIsVisible={setReferencesPopupActive}
            >
                <div className="font-lg">
                    <p>
                        Data Source:{' '}
                        <a href="https://www.pro-football-reference.com/teams/cin/draft.htm">
                            Pro Football Reference
                        </a>
                    </p>
                    <p>
                        Inspired by{' '}
                        <a href="https://poeltl.dunk.town/">Poeltl</a>
                    </p>
                </div>
            </PopUp>
            {/* Game over pop-up */}
            <PopUp
                isVisible={isGameOverPopupActive}
                setIsVisible={setGameOverPopupActive}
            >
                <div className="font-lg">
                    {gameOver.guessedPlayer ? (
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
        </div>
    )
}

export default App
