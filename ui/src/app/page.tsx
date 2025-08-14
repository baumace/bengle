'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Era } from '@/types/Era'
import { clsx } from 'clsx'
import Board from '@/components/board/Board'
import SearchBox from '@/components/search-box/SearchBox'
import { Button, IconButton } from '@/components/button/Button'
import Tooltip from '@/components/tooltip/Tooltip'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { usePlayers } from '@/hooks/usePlayers'
import { useGame } from '@/hooks/useGame'
import { PopupType } from '@/types/Popup'
import { ReferencesPopup } from '@/components/pop-up/ReferencesPopup'
import { HelpPopup } from '@/components/pop-up/HelpPopup'
import { SettingsPopup } from '@/components/pop-up/SettingsPopup'
import { GameOverPopup } from '@/components/pop-up/GameOverPopup'

function App() {
    const [selectedEra, setSelectedEra] = useState<Era>(Era.ALL)
    const { players } = usePlayers(selectedEra);
    const game = useGame({ players });
    const [activePopup, setActivePopup] = useState<PopupType>(PopupType.NONE);

    useEffect(() => {
        if (game.currAttempt === 7 && !game.gameOver) {
            setActivePopup(PopupType.GAME_OVER)
        }
    }, [game.currAttempt, game.gameOver])

    return (
        <div className="font-mono text-center h-dvh w-dvw bg-white dark:bg-zinc-900 text-black dark:text-white/80 [&_*]:border-black/20 [&_*]:dark:border-white/20">
            <header className="absolute left-12 top-6 grid grid-cols-3 gap-2">
                <Tooltip text="References">
                    <IconButton fn={() => setActivePopup(PopupType.REFERENCES)}>
                        <BookOpenIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip text="Help">
                    <IconButton fn={() => setActivePopup(PopupType.HELP)}>
                        <InformationCircleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip text="Settings">
                    <IconButton fn={() => setActivePopup(PopupType.SETTINGS)}>
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
                            game.endGame();
                            setActivePopup(PopupType.GAME_OVER);
                        }}
                        classes={clsx(
                            game.gameOver ? 'hidden' : 'visible',
                            'justify-self-end place-self-center'
                        )}
                    >
                        give up
                    </Button>
                    <Button
                        fn={() => game.setNewPlayer()}
                        classes={clsx(
                            game.gameOver ? 'visible' : 'hidden',
                            'justify-self-end place-self-center'
                        )}
                    >
                        new player
                    </Button>
                    <SearchBox
                        placeholder={
                            game.gameOver
                                ? 'Game Over'
                                : `Selection ${game.currAttempt + 1} of 7`
                        }
                        data={players}
                        disabled={game.gameOver}
                        selectPlayer={game.selectPlayer}
                    />
                    <Button
                        fn={() => setActivePopup(PopupType.GAME_OVER)}
                        classes={clsx(
                            game.gameOver ? 'visible' : 'hidden',
                            'justify-self-start place-self-center'
                        )}
                    >
                        show results
                    </Button>
                </div>
                <Board board={game.board} correctPlayer={game.correctPlayer} />
            </main>
            <footer>
                <HelpPopup activePopup={activePopup} setActivePopup={setActivePopup} />
                <SettingsPopup game={game} activePopup={activePopup} setActivePopup={setActivePopup} selectedEra={selectedEra} setSelectedEra={setSelectedEra} />
                <ReferencesPopup activePopup={activePopup} setActivePopup={setActivePopup} />
                <GameOverPopup game={game} activePopup={activePopup} setActivePopup={setActivePopup} />
            </footer>
        </div>
    )
}

export default App
