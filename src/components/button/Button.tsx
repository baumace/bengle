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
                'border-2 border-black font-extrabold bg-orange text-white rounded-lg hover:bg-orange/50'
            )}
            onClick={fn}
        >
            <p className="p-1 uppercase">{text}</p>
        </button>
    )
}
