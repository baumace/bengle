import { PopupType } from "@/types/Popup"
import { ReactNode } from "react"
import Popup from "./Popup"

interface ReferencesPopupProps {
    activePopup: PopupType
    setActivePopup: (popup: PopupType) => void
}

export function ReferencesPopup({ activePopup, setActivePopup }: ReferencesPopupProps) {
    interface LinkProps {
        href: string
        children?: ReactNode
    }

    function Link({ href, children }: LinkProps) {
        return (
            <a
                className="place-self-start text-orange"
                href={href}
                target="_blank"
                rel="noreferrer"
            >
                {children}
            </a>
        )
    }

    interface LabelProps {
        children?: ReactNode
    }

    function Label({ children }: LabelProps) {
        return <div className="place-self-end">{children}</div>
    }

    return (
        <Popup
            isVisible={activePopup === PopupType.REFERENCES}
            setActivePopup={setActivePopup}
        >
            <div className="font-lg grid grid-cols-[1fr_2fr] gap-1 w-fit">
                <Label>Inspired By:</Label>
                <Link href="https://poeltl.dunk.town/">Poeltl</Link>
                <Label>Source Code:</Label>
                <Link href="https://github.com/baumace/bengle">
                    github.com/baumace/bengle
                </Link>
            </div>
        </Popup>
    )
}
