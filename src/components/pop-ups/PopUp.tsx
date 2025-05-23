import clsx from 'clsx'
import { ReactNode } from 'react'

interface PopUpProps {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    children?: ReactNode
}

function PopUp({ isVisible, setIsVisible, children }: PopUpProps) {
    return (
        <div
            className={clsx(
                isVisible ? 'visible' : 'hidden',
                'z-99 fixed left-0 top-0 h-dvh w-dvw bg-black/40 grid place-items-center justify-items-center'
            )}
        >
            <div className="relative rounded-lg p-12 bg-white grid place-items-center">
                <button
                    className="absolute size-8 bg-white border-2 border-red-500 text-red-500 right-2 top-2 rounded-lg hover:bg-red-500/10"
                    onClick={() => {
                        setIsVisible(false)
                    }}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    )
}

export default PopUp
