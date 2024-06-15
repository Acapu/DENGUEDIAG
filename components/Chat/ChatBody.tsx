import ChatBubble from 'components/Chat/ChatBubble'
import './style.css'

interface chatType {
    text: any,
    type: string
}

interface props {
    dialog: Array<chatType>;
}

export default function ChatBody({ dialog = [] }: props) {
    return (
        <div className='chat-body'>
            {dialog.map(({text, type}, index) => {
                return (
                    <ChatBubble key={index} dialog={text} type={type}/>
                )
            })}
        </div>
    )
}