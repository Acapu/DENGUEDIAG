import { useNavigate } from 'react-router-dom';
import './style.css'
import LeftArrow from '/leftArrow.svg'
import Restart from '/restart.svg'

interface props {
    title: string;
    reloadChat: React.MouseEventHandler<HTMLButtonElement>
}

export default function ChatHeader({ title, reloadChat = () => {} }: props) {
    const navigate = useNavigate();

    return (
        <div className='chat-header'>
            <button style={{ width: "fit-content", backgroundColor: "transparent" }}
                onClick={() => navigate("/home")}
            >
                <img src={LeftArrow} style={{ width: "1.5em" }} />
            </button>
            <h2> {title} </h2>
            <button style={{ width: "fit-content", backgroundColor: "transparent" }}
                onClick={reloadChat}
            >
                <img src={Restart} style={{ width: "2em" }} />
            </button>
        </div>
    )
}