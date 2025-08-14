import { useState, useEffect } from 'react'
import { Player } from '@/types/Player'

export interface UseGameReturn {
    board: Player[];
    currAttempt: number;
    gameOver: boolean;
    correctPlayerGuessed: boolean;
    correctPlayer: Player | undefined;
    selectPlayer: (player: Player) => void;
    resetGame: () => void;
    setNewPlayer: () => void;
    endGame: () => void;
}

interface UseGameOptions {
    players: Player[];
    maxAttempts?: number;
}

export function useGame({ players, maxAttempts = 7 }: UseGameOptions): UseGameReturn {
    const [board, setBoard] = useState<Player[]>([])
    const [currAttempt, setCurrAttempt] = useState<number>(0)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [correctPlayerGuessed, setCorrectPlayerGuessed] = useState<boolean>(false)
    const [correctPlayer, setCorrectPlayer] = useState<Player | undefined>(undefined)

    useEffect(() => {
        if (players.length > 0) {
            setCorrectPlayer(players[Math.floor(Math.random() * players.length)])
            resetGame()
        }
    }, [players])

    useEffect(() => {
        if (currAttempt === maxAttempts && !gameOver) {
            setGameOver(true)
            setCorrectPlayerGuessed(false)
        }
    }, [currAttempt, gameOver, maxAttempts])

    function selectPlayer(player: Player) {
        setBoard([...board, player])
        if (player === correctPlayer) {
            setGameOver(true)
            setCorrectPlayerGuessed(true)
        }
        setCurrAttempt(currAttempt + 1)
    }

    function resetGame() {
        setBoard([])
        setCurrAttempt(0)
        setGameOver(false)
        setCorrectPlayerGuessed(false)
    }

    function setNewPlayer() {
        if (players.length > 0) {
            setCorrectPlayer(players[Math.floor(Math.random() * players.length)])
            resetGame()
        }
    }

    function endGame() {
        setGameOver(true)
        setCorrectPlayerGuessed(false)
    }

    return {
        board,
        currAttempt,
        gameOver,
        correctPlayerGuessed,
        correctPlayer,
        selectPlayer,
        resetGame,
        setNewPlayer,
        endGame,
    }
}
