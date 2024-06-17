import ChatContainer from "components/Chat/ChatContainer"
import ChatHeader from "components/Chat/ChatHeader"
import ChatBody from "components/Chat/ChatBody"
import { useEffect, useState } from 'react'
import Question from "./Question";
import Answer from "./Answer";

interface Dialog {
    text: any,
    type: string,
    id: string
}

export default function ChatInterface() {

    const [dialog, setDialog] = useState<Array<Dialog>>([]);
    const [language, setLanguage] = useState<string>("en");

    const getRandomNumber = () => {
        return Math.floor(Math.random() * new Date().getMilliseconds()).toString()
    }

    const getAnswer = (id: number, index: number) => {
        const newDialog = {
            text: Answer[id].answer[index][language],
            type: "user",
            id: getRandomNumber()
        };
        setDialog(prevDialog => {
            let copy = prevDialog.slice();
            copy.splice(-1, 1, newDialog);
            return copy;
        })
        const scrollTimeout = setTimeout(() => {
            const latestDialog = document.getElementById(newDialog.id);
            latestDialog?.scrollIntoView({ behavior: "smooth" })
            clearTimeout(scrollTimeout);
        }, 200)
        if (typeof(newDialog.text) === 'string') {
            const nextDialog = setTimeout(() => {
                if (typeof(Answer[id].answer[index].nextQuestionID) === 'number') {
                    addDialog(Answer[id].answer[index].nextQuestionID);
                }
                clearTimeout(nextDialog);
            }, (newDialog.text.length * 30))
        }
    }

    const addDialog = (id: number) => {
        console.log(id);

        const botDialog = {
            text: Question[id]?.question[language] || "",
            type: "bot",
            id: getRandomNumber()
        }
        if (botDialog.text.length !== 0) {
            setDialog(prevDialog => ([
                ...prevDialog,
                botDialog
            ]))
            const scrollTimeout = setTimeout(() => {
                const latestDialog = document.getElementById(botDialog.id);
                latestDialog?.scrollIntoView({ behavior: "smooth" })
                clearTimeout(scrollTimeout);
            }, 200)
            if (Question[id].choice !== null) {
                const test = setTimeout(() => {
                    setDialog(prevDialog => ([
                        ...prevDialog,
                        {
                            text: Question[id].choice(getAnswer),
                            type: "user",
                            id: getRandomNumber()
                        },
                    ]))
                    clearTimeout(test);
                }, (botDialog.text.length * 30))
            } else {
                const contBotDialog = setTimeout(() => {
                    addDialog(id + 1);
                    clearTimeout(contBotDialog);
                }, (botDialog.text.length * 30))
            }
        }
    }

    useEffect(() => {
        addDialog(0);
    }, [])

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
            <ChatHeader title='DengueDiag Bot' reloadChat={() => window.location.reload()} />
            <ChatBody dialog={dialog} />
        </ChatContainer>
    )
}