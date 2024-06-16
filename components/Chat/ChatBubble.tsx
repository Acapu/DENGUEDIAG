import './style.css'
import people from '/people.png'
import robot from '/robot.png'

interface props {
    dialog: string;
    type: string;
    id: string;
}

export default function ChatBody({ id="", dialog = "", type = "bot" }: props) {
    return (
        <li id={id} className={`chat-bubble-container ${type !== 'bot' ? "bubble-right" : ""}`}>
            <div className={`chat-bubble ${type === "bot" ? 'left' : 'right'}`}>
                {dialog}
            </div>
            <img src={type === "bot" ? robot : people} alt="Avatar" className={`chat-avatar`}/>
        </li>
    )
}