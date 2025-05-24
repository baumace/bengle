import clsx from 'clsx'
import { ReactNode } from 'react'

interface ButtonProps {
    fn: () => void
    classes?: string
    children: ReactNode
}

export function Button({ fn, classes, children }: ButtonProps) {
    return (
        <button
            className={clsx(
                classes,
                'w-fit h-fit font-extrabold bg-orange text-white rounded-lg overflow-hidden'
            )}
            onClick={fn}
        >
            <div className="bg-black/0 hover:bg-black/20">
                <p className="px-4 py-2 uppercase">{children}</p>
            </div>
        </button>
    )
}

interface IconButtonProps {
    fn: () => void
    classes?: string
    children?: ReactNode
}

export function IconButton({ fn, classes, children }: IconButtonProps) {
    return (
        <button
            className={clsx(
                classes,
                'size-10 text-black hover:text-orange [&>*]:scale-150 rounded-full'
            )}
            onClick={fn}
        >
            {children}
        </button>
    )
}
