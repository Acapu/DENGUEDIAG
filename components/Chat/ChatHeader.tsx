import { useNavigate } from 'react-router-dom';
import './style.css'
import LeftArrow from '/leftArrow.svg'
import Restart from '/restart.svg'
import Toggle from 'components/Toggle/Toggle'

interface props {
    title: string;
    language: string;
    setLanguage: Function;
    reloadChat: React.MouseEventHandler<HTMLButtonElement>
}

export default function ChatHeader({ title, language, setLanguage, reloadChat = () => { } }: props) {
    const navigate = useNavigate();

    return (
        <div className='chat-header'>
            <button style={{ width: "fit-content", backgroundColor: "transparent" }}
                onClick={() => {
                    let confirmation = confirm("Are you sure you want to leave this page? Any progress won't be saved.");
                    if (confirmation) {
                        navigate("/", { replace: true });
                    }
                }}
            >
                <img src={LeftArrow} style={{ width: "1.5em" }} />
            </button>
            <h2> {title} </h2>
            <Toggle language={language} setLanguage={setLanguage} />
            <button style={{ width: "fit-content", backgroundColor: "transparent" }}
                onClick={reloadChat}
            >
                <img src={Restart} style={{ width: "2em" }} />
            </button>
        </div>
    )
}