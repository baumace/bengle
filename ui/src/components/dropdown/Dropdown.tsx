import React, { ReactElement, ReactNode, useState } from 'react'
import { Button } from '../button/Button'
//import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { clsx } from 'clsx'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface DropdownProps {
    text: string
    children:
        | Array<ReactElement<DropdownItemProps>>
        | ReactElement<DropdownItemProps>
}

export function Dropdown({ text, children }: DropdownProps) {
    const [dropdownActive, setDropdownActive] = useState(false)

    // close dropdown when an item is clicked
    const clonedChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, {
            fn: (event: React.MouseEvent<HTMLDivElement>) => {
                child.props.fn?.(event)
                setDropdownActive(false)
            },
        })
    )

    const iconClasses = 'ml-1 cursor-pointer size-6 inline-block'

    return (
        <div className="relative cursor-pointer text-orange">
            <Button fn={() => setDropdownActive(!dropdownActive)}>
                {text}
                {dropdownActive ? (
                    <ChevronUpIcon
                        onClick={() => setDropdownActive(!dropdownActive)}
                        className={iconClasses}
                    />
                ) : (
                    <ChevronDownIcon
                        onClick={() => setDropdownActive(!dropdownActive)}
                        className={iconClasses}
                    />
                )}
            </Button>
            <div
                className={clsx(
                    'absolute mt-1 w-full border-2 bg-white dark:bg-black rounded-lg',
                    dropdownActive ? 'visible' : 'hidden'
                )}
            >
                {clonedChildren}
            </div>
        </div>
    )
}

interface DropdownItemProps {
    fn?: (event: React.MouseEvent<HTMLDivElement>) => void
    children?: ReactNode
}

export function DropdownItem({ fn, children }: DropdownItemProps) {
    return (
        <div className="w-full text-md py-1 hover:bg-orange/10" onClick={fn}>
            {children}
        </div>
    )
}
