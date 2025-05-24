import React, { ReactElement, ReactNode, useState } from 'react'
import { Button } from '../button/Button'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { clsx } from 'clsx'

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
            fn: (...args: any) => {
                child.props.fn?.(args)
                setDropdownActive(false)
            },
        })
    )

    return (
        <div className="relative cursor-pointer text-orange">
            <Button fn={() => setDropdownActive(!dropdownActive)}>
                {text}
                {dropdownActive ? (
                    <KeyboardArrowUpIcon
                        onClick={() => setDropdownActive(!dropdownActive)}
                        className="ml-1 cursor-pointer"
                    />
                ) : (
                    <KeyboardArrowDownIcon
                        onClick={() => setDropdownActive(!dropdownActive)}
                        className="ml-1 cursor-pointer"
                    />
                )}
            </Button>
            <div
                className={clsx(
                    'absolute mt-1 w-full border-2 border-black bg-white rounded-lg',
                    dropdownActive ? 'visible' : 'hidden'
                )}
            >
                {clonedChildren}
            </div>
        </div>
    )
}

interface DropdownItemProps {
    fn?: ({}: any) => void
    children?: ReactNode
}

export function DropdownItem({ fn, children }: DropdownItemProps) {
    return (
        <div className="w-full text-md hover:bg-orange/10" onClick={fn}>
            {children}
        </div>
    )
}
