import './style.css'
import people from '/people.png'
import robot from '/robot.png'

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
            <img src={type === "bot" ? robot : people} alt="Avatar" className={`chat-avatar`}/>
        </div>
    )
}