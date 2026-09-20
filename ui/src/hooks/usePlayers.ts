import { useEffect, useState } from 'react'
import { Player } from '@/types/Player'
import { Era, filterPlayersByEra } from '@/types/Era'

// Baked in at build time by the static export, so this must be supplied as a
// Docker build arg rather than a runtime env var on the container.
// `||` not `??`: an unpassed Docker build arg arrives as an empty string,
// which is defined and would otherwise slip through as a relative URL.
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

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
        fetch(`${API_BASE_URL}/bengle/api/players`)
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
