import { ReactNode } from "react"
import './style.css'

interface Props {
    children: ReactNode
}

export default function ChatContainer({ children }: Props) {
    return (
        <div className="chat-container">
            {children}
        </div>
    )
}