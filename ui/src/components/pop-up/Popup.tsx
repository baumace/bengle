import { PopupType } from '@/types/Popup'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface PopupProps {
    isVisible: boolean
    setActivePopup: (popup: PopupType) => void
    children?: ReactNode
}

function Popup({ isVisible, setActivePopup, children }: PopupProps) {
    return (
        <div
            className={clsx(
                isVisible ? 'visible' : 'hidden',
                'z-99 fixed left-0 top-0 h-dvh w-dvw bg-black/40 dark:bg-white/20 grid place-items-center justify-items-center'
            )}
        >
            <div className="relative rounded-lg p-4 pr-12 bg-white dark:bg-zinc-900 grid place-items-center">
                <ExitButton />
                {children}
            </div>
        </div>
    )

    function ExitButton() {
        return (
            <button
                className="absolute size-8 bg-red-600 text-white right-2 top-2 rounded-lg overflow-hidden"
                onClick={() => {
                    setActivePopup(PopupType.NONE)
                }}
            >
                <div className="flex bg-black/0 hover:bg-black/20 font-extrabold size-full items-center justify-center">
                    X
                </div>
            </button>
        )
    }
}

export default Popup
