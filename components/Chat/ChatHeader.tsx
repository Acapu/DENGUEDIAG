import './style.css'
interface props {
    title: string;
}

export default function ChatHeader({ title }: props) {
    return (
        <div className='chat-header'>
            <h2> {title} </h2>
        </div>
    )
}