import { clsx } from 'clsx'
import { ReactNode } from 'react'

interface TooltipProps {
    content: string
    children?: ReactNode
}

function Tooltip({ content, children }: TooltipProps) {
    return (
        <div className="relative group">
            {children}
            <div
                className={clsx(
                    // main
                    'absolute hidden group-hover:flex px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm',
                    // arrow
                    "after:content-[''] after:absolute",
                    // positioning
                    // main
                    'mt-2 left-1/2 -translate-x-1/2',
                    // arrow
                    'after:left-1/2 after:-top-[50%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700'
                )}
            >
                {content}
            </div>
        </div>
    )
}

export default Tooltip
