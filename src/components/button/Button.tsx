import clsx from 'clsx'

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
