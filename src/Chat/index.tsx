import './style.css'
import ChatContainer from "components/Chat/ChatContainer"
import ChatHeader from "components/Chat/ChatHeader"
// import ChatFooter from "components/Chat/ChatFooter"
import ChatBody from "components/Chat/ChatBody"

export default function ChatInterface() {

    return (
        <ChatContainer>
            <ChatHeader title='DengueDiag Bot' />
            {/* <div> */}
            <ChatBody dialog={[
                {
                    text: "Hello there, I am DengueDiag bot. How can I help you?",
                    type: "bot"
                },
                {
                    text: "Do a diagnosis of dengue.",
                    type: "user"
                },
                {
                    text: "Sure, is it for yourself or any other family member or friend?",
                    type: "bot"
                },
                {
                    text: (<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <button>Myself</button>
                        <button>Family Member</button>
                    </div>),
                    type: "user"
                },
                {
                    text: "Sure, Let's start the diagnosis.",
                    type: "bot"
                },
                {
                    text: "Do you have any fever within this week?",
                    type: "bot"
                },
            ]} />
            {/* <ChatFooter
                    component={[
                        <button>No</button>,
                        <button>Yes</button>
                    ]}
                /> */}
            {/* </div> */}
        </ChatContainer>
    )
}