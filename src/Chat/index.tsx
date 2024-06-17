import ChatContainer from "components/Chat/ChatContainer"
import ChatHeader from "components/Chat/ChatHeader"
// import ChatFooter from "components/Chat/ChatFooter"
import ChatBody from "components/Chat/ChatBody"
import { useEffect, useState } from 'react'

export default function ChatInterface() {

    const getRandomNumber = () => {
        return Math.floor(Math.random() * new Date().getMilliseconds()).toString()
    }

    const addDialog = () => {
        const testData = {
            text: "Testing dialog",
            type: "bot",
            id: getRandomNumber()
        }
        setDialog(prevDialog => {
            return [
                ...prevDialog,
                testData
            ]
        })
        const scrollTimeout = setTimeout(() => {
            const latestDialog = document.getElementById(testData.id);
            latestDialog?.scrollIntoView({ behavior: "smooth" })
            clearTimeout(scrollTimeout);
        }, 200)
    }

    const [dialog, setDialog] = useState([
        {
            text: "Hello there, I am DengueDiag bot. How can I help you today?",
            type: "bot",
            id: getRandomNumber()
        },
        // {
        //     text: "Do a diagnosis of dengue.",
        //     type: "user",
        //     id: getRandomNumber()
        // },
        // {
        //     text: "Sure, is it for yourself or any other family member or friend?",
        //     type: "bot",
        //     id: getRandomNumber()
        // },
        {
            text: (<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={addDialog}>Dengue Diagnosis</button>
                <button>Tell me about dengue.</button>
            </div>),
            type: "user",
            id: getRandomNumber()
        },
    ]);

    useEffect(() => {
        const listener = (ev: WindowEventMap[keyof WindowEventMap]) => {
            if (dialog.length !== 0) ev.preventDefault();
            return true
        }
        window.addEventListener("beforeunload", listener);
        return () => {
            return window.removeEventListener("beforeunload", listener);
        }
    }, [dialog])

    return (
        <ChatContainer>
            <ChatHeader title='DengueDiag Bot' reloadChat={() => setDialog([{
                text: "Hello there, I am DengueDiag bot. How can I help you?",
                type: "bot",
                id: getRandomNumber()
            }])} />
            {/* <div> */}
            <ChatBody dialog={dialog} />
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