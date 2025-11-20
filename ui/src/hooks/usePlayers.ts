import { useEffect, useState } from 'react'
import { Player } from '@/types/Player'
import { Era, filterPlayersByEra } from '@/types/Era'

export interface UsePlayersReturn {
    players: Player[];
    loading: boolean;
    error: string | null;
}

export function usePlayers(selectedEra: Era): UsePlayersReturn {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:8080/bengle/api/players')
            .then((res) => res.json())
            .then((data: Player[]) => {
                const filtered = selectedEra === Era.ALL
                    ? data
                    : data.filter((player) => filterPlayersByEra(player, selectedEra))
                setPlayers(filtered)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [selectedEra])

    return { players, loading, error }
}
