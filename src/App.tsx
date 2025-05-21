import './App.css'
import Board from './components/board/Board'
import SearchBox from './components/search-box/SearchBox'
import GameOverPopUp from './components/pop-ups/game-over/GameOverPopUp'
import HelpPopUp from './components/pop-ups/help/HelpPopUp'
import SettingsPopUp from './components/pop-ups/settings/SettingsPopUp'
import { useEffect, useState } from 'react'
import draftPicks from './data/DraftPicks.json'
import { Era, filterPlayersByEra } from './models/Era'
import { Player } from './models/Player'

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
    const [isGameOverPopupActive, setGameOverPopupActive] = useState(false)
    const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL)
    const [correctPick, setCorrectPick] = useState<Player>(
        draftPicks[Math.floor(Math.random() * draftPicks.length)]
    )

    useEffect(() => {
        if (currAttempt === MAX_ATTEMPTS) {
            setGameOver({ gameOver: true, guessedPlayer: false })
            setGameOverPopupActive(true)
        }
    }, [currAttempt])

    useEffect(() => {
        resetGame()
    }, [correctPick])

    useEffect(() => {
        setPicksArray(
            draftPicks.filter((player) =>
                filterPlayersByEra(player, selectedEra)
            )
        )
    }, [selectedEra])

    function selectPlayer(player: Player) {
        setBoard([...board, player])

        if (player === correctPick) {
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
        setCorrectPick(
            picksArray[Math.floor(Math.random() * picksArray.length)]
        )
    }

    return (
        <div className="App">
            <header>
                <h1>BENGLE</h1>
                <h2>Bengals Draft Day Selections</h2>
            </header>
            <HelpPopUp />
            <SettingsPopUp
                setNewPlayer={setNewPlayer}
                resetGame={resetGame}
                selectedEra={selectedEra}
                setSelectedEra={setSelectedEra}
            />
            <div className="game">
                <Board board={board} correctPick={correctPick} />{' '}
                {gameOver.gameOver ? (
                    <div
                        className="appNewPlayerButton"
                        onClick={() => setNewPlayer()}
                    >
                        <p className="appNewPlayerText">NEW PLAYER</p>
                    </div>
                ) : (
                    <div
                        className="giveUpButton"
                        onClick={() => {
                            setGameOver({
                                gameOver: true,
                                guessedPlayer: false,
                            })
                            setGameOverPopupActive(true)
                        }}
                    >
                        <p className="giveUpText">GIVE UP</p>
                    </div>
                )}
                <div
                    className="showResultsButton"
                    onClick={() => setGameOverPopupActive(true)}
                    id={gameOver.gameOver ? 'show' : 'hide'}
                >
                    <p className="showResultsText">SHOW RESULTS</p>
                </div>
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
            </div>
            <footer>
                <p>
                    Data Source:{' '}
                    <a href="https://www.pro-football-reference.com/teams/cin/draft.htm">
                        Pro Football Reference
                    </a>
                </p>
                <p>
                    Inspired by <a href="https://poeltl.dunk.town/">Poeltl</a>
                </p>
            </footer>
            <GameOverPopUp
                gameOver={gameOver}
                currAttempt={currAttempt}
                correctPick={correctPick}
                popupActive={isGameOverPopupActive}
                setPopupActive={setGameOverPopupActive}
            />
        </div>
    )
}

export default App
