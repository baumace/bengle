import './App.css'
import Board from './components/board/Board'
import SearchBox from './components/search-box/SearchBox'
import GameOverPopUp from './components/pop-ups/GameOverPopUp'
import HelpPopUp from './components/pop-ups/HelpPopUp'
import SettingsPopUp from './components/pop-ups/SettingsPopUp'
import { useEffect, useState } from 'react'
import draftPicks from './data/DraftPicks.json'
import { Era, filterPlayersByEra } from './models/Era'
import { Player } from './models/Player'
import { Button } from './components/button/Button'
import { clsx } from 'clsx'

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
    const [correctPlayer, setCorrectPlayer] = useState<Player>(
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
        <div className="text-center relative h-full w-full m-6">
            <header className="p-4">
                <div className="font-extrabold text-4xl">BENGLE</div>
                <div className="font-semibold text-md">
                    Bengals Draft Day Selections
                </div>
            </header>
            <div className="mx-[20%] grid grid-cols-1 gap-4">
                <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-2">
                    {gameOver.gameOver ? (
                        <Button
                            text="new player"
                            fn={() => setNewPlayer()}
                            classes="justify-self-end place-self-center"
                        />
                    ) : (
                        <Button
                            text="give up"
                            fn={() => {
                                setGameOver({
                                    gameOver: true,
                                    guessedPlayer: false,
                                })
                                setGameOverPopupActive(true)
                            }}
                            classes="justify-self-end place-self-center"
                        />
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
                        text="show results"
                        fn={() => setGameOverPopupActive(true)}
                        classes={clsx(
                            gameOver.gameOver ? 'visible' : 'hidden',
                            'justify-self-start place-self-center'
                        )}
                    />
                </div>
                <Board board={board} correctPlayer={correctPlayer} />{' '}
            </div>
            {/*  TODO: Change the footer references into a references pop-up */}
            {/*
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
            */}
            <div className="absolute left-0 top-0 grid grid-cols-2 gap-2">
                <HelpPopUp />
                <SettingsPopUp
                    setNewPlayer={setNewPlayer}
                    resetGame={resetGame}
                    selectedEra={selectedEra}
                    setSelectedEra={setSelectedEra}
                />
            </div>
            <GameOverPopUp
                gameOver={gameOver}
                currAttempt={currAttempt}
                correctPick={correctPlayer}
                popupActive={isGameOverPopupActive}
                setPopupActive={setGameOverPopupActive}
            />
        </div>
    )
}

export default App
