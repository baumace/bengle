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
            <div className="relative rounded-lg p-4 pr-12 bg-white grid place-items-center">
                <button
                    className="absolute size-8 bg-red-600 text-white right-2 top-2 rounded-lg overflow-hidden"
                    onClick={() => {
                        setIsVisible(false)
                    }}
                >
                    <div className="flex bg-black/0 hover:bg-black/20 font-extrabold size-full items-center justify-center">
                        X
                    </div>
                </button>
                {children}
            </div>
        </div>
    )
}

export default PopUp
