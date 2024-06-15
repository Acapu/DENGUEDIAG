import './style.css'

interface props {
    dialog: string;
    type: string;
}

export default function ChatBody({ dialog = "", type = "bot" }: props) {
    return (
        <div className={`chat-bubble-container ${type !== 'bot' ? "bubble-right" : ""}`}>
            <div className={`chat-bubble ${type === "bot" ? 'left' : 'right'}`}>
                {dialog}
            </div>
            <div className={`chat-avatar ${type}`}>

            </div>
        </div>
    )
}