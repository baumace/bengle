import clsx from 'clsx'
import { ReactNode } from 'react'

interface ButtonProps {
    text: string
    fn: () => void
    classes?: string
}

export function Button({ text, fn, classes }: ButtonProps) {
    return (
        <button
            className={clsx(
                classes,
                'w-fit h-fit border-2 border-black font-extrabold bg-orange text-white rounded-lg hover:bg-orange/50'
            )}
            onClick={fn}
        >
            <p className="px-4 py-1 uppercase">{text}</p>
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
                'size-10 text-black hover:text-orange [&>*]:scale-150'
            )}
            onClick={fn}
        >
            {children}
        </button>
    )
}
