import './style.css'
import people from '/people.png'
import mosquito from '/mosquito.png'

interface props {
    dialog: any;
    type: string;
    id: string;
}

export default function ChatBody({ id="", dialog = "", type = "bot" }: props) {
    
    return (
        <li id={id} className={`chat-bubble-container ${type !== 'bot' ? "bubble-right" : ""}`}>
            <div className={`chat-bubble ${type === "bot" ? 'left' : 'right'} ${typeof(dialog) !== 'string' ? 'choice' : 'answer'}`}>
                <span className={typeof(dialog) === 'string' ? 'word' : ''}>{dialog}</span>
            </div>
            <img src={type === "bot" ? mosquito : people} alt="Avatar" className={`chat-avatar`}/>
        </li>
    )
}