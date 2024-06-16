import ChatBubble from 'components/Chat/ChatBubble'
import './style.css'

interface chatType {
    text: any,
    type: string,
    id: string
}

interface props {
    dialog: Array<chatType>;
}

export default function ChatBody({ dialog = [] }: props) {
    return (
        <ul className='chat-body'>
            {dialog.map(({text, type, id}, index) => {
                return (
                    <ChatBubble id={id} key={index} dialog={text} type={type}/>
                )
            })}
        </ul>
    )
}