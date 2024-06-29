import ChatContainer from "components/Chat/ChatContainer"
import ChatHeader from "components/Chat/ChatHeader"
import ChatBody from "components/Chat/ChatBody"
import { useEffect, useState } from 'react'
import Question from "./Question";
import Answer from "./Answer";
import Conclusion from "./Conclusion";
import { useForm } from "react-hook-form";

interface Dialog {
    text: any,
    type: string,
    id: string
}

interface FeverSymptoms {
    fever: boolean,
    feverDays: number,
    headache: boolean,
    vomiting: boolean,
    vomitingDays: number,
    bodyache: boolean
    rash: boolean
}

interface CriticalSymptoms {
    bleedingMucose: boolean,
    multipleVomiting: boolean,
    diarhea: boolean,
    persistentDiarhea: boolean,
    stomachpain: boolean,
    difficultyBreathing: boolean,
    lowConsciousness: boolean,
    extremeFatigue: boolean
}

interface AdditionalDengueInfo {
    travelHotspot: boolean,
    liveHotspot: boolean
}

export default function ChatInterface() {

    const [dialog, setDialog] = useState<Array<Dialog>>([]);
    const [language, setLanguage] = useState<string>("en");

    const probablyDengue = useForm<AdditionalDengueInfo>({
        defaultValues: {
            travelHotspot: false,
            liveHotspot: false
        }
    })

    const feverSymptoms = useForm<FeverSymptoms>({
        defaultValues: {
            fever: false, vomiting: false, vomitingDays: 0,
            feverDays: 0, headache: false, bodyache: false, rash: false
        }
    })

    const criticalSymptoms = useForm<CriticalSymptoms>({
        defaultValues: {
            bleedingMucose: false,
            multipleVomiting: false,
            diarhea: false,
            persistentDiarhea: false,
            stomachpain: false,
            difficultyBreathing: false,
            lowConsciousness: false,
            extremeFatigue: false
        }
    })

    const setFeverDays = (days: number) => {
        feverSymptoms.setValue("fever", true);
        feverSymptoms.setValue("feverDays", days);
    }

    const setOtherFeverSymptoms = (symptoms: { headache: false, vomiting: false, bodyache: false }) => {
        feverSymptoms.setValue("bodyache", symptoms.bodyache);
        feverSymptoms.setValue("headache", symptoms.headache);
        feverSymptoms.setValue("vomiting", symptoms.vomiting);
    }

    const setCriticalSymptoms = (symptoms: { persistentDiarhea: false, stomachpain: false, difficultyBreathing: false }) => {
        criticalSymptoms.setValue("persistentDiarhea", symptoms.persistentDiarhea);
        criticalSymptoms.setValue("stomachpain", symptoms.stomachpain);
        criticalSymptoms.setValue("difficultyBreathing", symptoms.difficultyBreathing);
    }

    const setVomitingDays = (times: number) => {
        feverSymptoms.setValue("vomiting", true);
        feverSymptoms.setValue("vomitingDays", times);
        if (times >= 3) {
            criticalSymptoms.setValue("multipleVomiting", true)
        } else {
            if (feverSymptoms.watch("feverDays") > 2) {
                criticalSymptoms.setValue("multipleVomiting", true)
            }
        }
    }

    const setRashSymptom = () => {
        feverSymptoms.setValue('rash', true);
    }

    const setBleedingMucose = () => {
        criticalSymptoms.setValue('bleedingMucose', true);
    }

    const setExtremeFatigue = () => {
        criticalSymptoms.setValue("extremeFatigue", true);
    }

    const setLowConsciousness = () => {
        criticalSymptoms.setValue("lowConsciousness", true);
    }

    const setLiveInHotspot = () => {
        probablyDengue.setValue("liveHotspot", true);
    }

    const setTraveltoHotspot = () => {
        probablyDengue.setValue("travelHotspot", true);
    }

    const getSetterFunction = (id: number) => {
        let setter;
        switch (id) {
            case 3:
                setter = setFeverDays
                break;
            case 4:
                setter = setOtherFeverSymptoms
                break;
            case 5:
                setter = setRashSymptom
                break;
            case 6:
                setter = setBleedingMucose
                break;
            case 7:
                setter = setVomitingDays
                break;
            case 8:
                setter = setCriticalSymptoms
                break;
            case 9:
                setter = setExtremeFatigue
                break;
            case 10:
                setter = setLowConsciousness
                break;
            case 11:
                setter = setLiveInHotspot
                break;
            case 12:
                setter = setTraveltoHotspot
                break;

            default:
                setter = null
                break;
        }
        return setter;
    }

    const generateConclusion = () => {
        console.log("feverSymptoms", feverSymptoms.watch());
        console.log("critical symptoms", criticalSymptoms.watch());
        console.log("probably symptoms", probablyDengue.watch());
        let phase = Conclusion['notDengue']
        const criticalSymptomNum = Object.values(criticalSymptoms.watch()).filter(v => (v === true)).length;
        const feverSymptomsNum = Object.values(feverSymptoms.watch()).filter(v => (typeof(v) === "boolean" && v === true)).length;
        console.log(feverSymptoms.watch("fever"), "feverrrrrr");
        console.log(criticalSymptomNum);
        console.log(feverSymptomsNum);
        
        if (!feverSymptoms.watch("fever")) {
            console.log("tak demam");
            
            if (criticalSymptomNum > 0 || feverSymptomsNum > 0) {
                console.log("ada simptom");
                if (probablyDengue.watch("liveHotspot") || probablyDengue.watch("travelHotspot")) {
                    phase = Conclusion['suspectDengue'];
                } else {
                    phase = Conclusion['otherFever'];
                }
            } else {
                console.log("xde simptom");
                phase = Conclusion['notDengue'];
            }
        }
        else if (criticalSymptomNum >= 1 && feverSymptoms.watch("fever")) {
            console.log("critical", Object.values(criticalSymptoms.watch()).filter(v => (v === true)).length);
            phase = Conclusion['criticalPhase'];
        } else if (feverSymptomsNum >= 2 && feverSymptoms.watch("fever")) {
            console.log("febrileeeee");
            phase = Conclusion['febrilePhase'];
        }
        let conclusionDialog: Dialog = {
            text: (
                <>
                    <span>{phase.conclusion[language]}</span>
                    <br /><br />
                    <span>{phase.summary[language]}</span>
                </>
            ),
            type: "bot",
            id: getRandomNumber()
        }
        addDialog(conclusionDialog);
    }

    const getRandomNumber = () => {
        return Math.floor(Math.random() * new Date().getMilliseconds()).toString() + new Date().getMilliseconds().toString()
    }

    const getAnswer = (id: number, choice: number, value: string = "") => {
        const newDialog = {
            text: value.length === 0 ? Answer[id].answer[choice][language] : value,
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

        if (typeof (newDialog.text) === 'string') {
            const nextDialog = setTimeout(() => {
                if (typeof (Answer[id].answer[choice].nextQuestionID) === 'number') {
                    addQuestionDialog(Answer[id].answer[choice].nextQuestionID);
                }
                clearTimeout(nextDialog);
            }, (newDialog.text.length * 40))
        } else {
            const nextDialog = setTimeout(() => {
                if (id === 3 && feverSymptoms.watch("vomiting")) {
                    addQuestionDialog(7);
                    return;
                }
                if (typeof (Answer[id].answer[choice].nextQuestionID) === 'number') {
                    addQuestionDialog(Answer[id].answer[choice].nextQuestionID);
                }
                clearTimeout(nextDialog);
            }, (500))
        }
    }

    const addDialog = (dialog: Dialog) => {
        setDialog(prevDialog => ([
            ...prevDialog,
            dialog
        ]))
        const scrollTimeout = setTimeout(() => {
            const latestDialog = document.getElementById(dialog.id);
            latestDialog?.scrollIntoView({ behavior: "smooth" })
            clearTimeout(scrollTimeout);
        }, 200)
    }

    const addQuestionDialog = async (id: number, dialog?: Dialog) => {
        const botDialog = {
            text: Question[id]?.question[language] || "",
            type: "bot",
            id: getRandomNumber()
        }
        if (botDialog.text.length !== 0 || dialog !== undefined) {
            addDialog((dialog !== undefined ? dialog : botDialog));
            if (Question[id] && Question[id]?.choice !== null) {
                const setter = getSetterFunction(id);
                const test = setTimeout(() => {
                    const choiceDialog = {
                        text: Question[id].choice(getAnswer, language, setter),
                        type: "user",
                        id: getRandomNumber()
                    }
                    setDialog(prevDialog => ([
                        ...prevDialog,
                        choiceDialog
                    ]))
                    const scrollTimeout = setTimeout(() => {
                        const cDialog = document.getElementById(choiceDialog.id);
                        cDialog?.scrollIntoView({ behavior: "smooth" })
                        clearTimeout(scrollTimeout);
                    }, 200)
                    clearTimeout(test);
                }, (botDialog.text.length * 40))
            } else {
                const contBotDialog = setTimeout(() => {
                    addQuestionDialog(id + 1).then(res => {
                        if (res && id === 14) {
                            generateConclusion()
                        }
                    });
                    clearTimeout(contBotDialog);
                }, (botDialog.text.length * 40))
            }
        }
        return true
    }

    useEffect(() => {
        addQuestionDialog(0);
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