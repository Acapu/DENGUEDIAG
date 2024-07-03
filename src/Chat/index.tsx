import ChatContainer from "components/Chat/ChatContainer"
import ChatHeader from "components/Chat/ChatHeader"
import ChatBody from "components/Chat/ChatBody"
import { useEffect, useRef, useState } from 'react'
import Question from "./Question";
import Answer from "./Answer";
import Conclusion from "./Conclusion";
import { useForm } from "react-hook-form";

interface Dialog {
    text: any,
    type: string,
    id: string
}

export interface FeverSymptoms {
    [key: string]: boolean | number,
    fever: boolean,
    feverDays: number,
    headache: boolean,
    vomiting: boolean,
    vomitingDays: number,
    bodyache: boolean
    rash: boolean
}

export interface CriticalSymptoms {
    [key: string]: boolean,
    bleedingMucose: boolean,
    multipleVomiting: boolean,
    persistentdiarrhoea: boolean,
    stomachpain: boolean,
    difficultyBreathing: boolean,
    lowConsciousness: boolean,
    extremeFatigue: boolean
}

export interface AdditionalDengueInfo {
    travelHotspot: boolean,
    liveHotspot: boolean
}

export default function ChatInterface() {

    const [dialog, setDialog] = useState<Array<Dialog>>([]);
    const [language, setLanguage] = useState<string>(localStorage.getItem("lang") || "en");
    const suspectDengueValue = useRef(0);
    const timeout = useRef<Array<number>>([])
    const setChatLanguage = () => {
        let confirmation = confirm("Changing language will reset the session and any progress won't be saved. Continue?");
        if (confirmation) {
            for (let t of timeout.current) {
                clearTimeout(t);
            }
            timeout.current = [];
            setDialog([]);
            setLanguage(prevLang => (prevLang === "en" ? "my" : "en"));
        }
    }

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
            multipleVomiting: false, //Gastrointestinal system
            persistentdiarrhoea: false, //Gastrointestinal system
            stomachpain: false, //Gastrointestinal system
            difficultyBreathing: false,// Respiratory system
            lowConsciousness: false, // Central nervous system 
            extremeFatigue: false // Central nervous system 
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
        if (Object.values(symptoms).some(v => v)) suspectDengueValue.current += 1;
    }

    const setCriticalSymptoms = (symptoms: { persistentdiarrhoea: false, stomachpain: false, difficultyBreathing: false }) => {
        criticalSymptoms.setValue("persistentdiarrhoea", symptoms.persistentdiarrhoea);
        criticalSymptoms.setValue("stomachpain", symptoms.stomachpain);
        criticalSymptoms.setValue("difficultyBreathing", symptoms.difficultyBreathing);
        if (Object.values(symptoms).some(v => v)) suspectDengueValue.current += 2;
    }

    const setVomitingDays = (times: number) => {
        feverSymptoms.setValue("vomiting", true);
        feverSymptoms.setValue("vomitingDays", times);
        if (times >= 3) {
            criticalSymptoms.setValue("multipleVomiting", true)
            suspectDengueValue.current += 2;
        } else {
            if (feverSymptoms.watch("feverDays") > 2) {
                criticalSymptoms.setValue("multipleVomiting", true)
                suspectDengueValue.current += 2;
            }
        }
    }

    const setRashSymptom = () => {
        feverSymptoms.setValue('rash', true);
        suspectDengueValue.current += 2;
    }

    const setBleedingMucose = () => {
        criticalSymptoms.setValue('bleedingMucose', true);
        suspectDengueValue.current += 1;
    }

    const setExtremeFatigue = () => {
        criticalSymptoms.setValue("extremeFatigue", true);
        suspectDengueValue.current += 1;
    }

    const setLowConsciousness = () => {
        criticalSymptoms.setValue("lowConsciousness", true);
        suspectDengueValue.current += 1;
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
        let phase = Conclusion['otherFever']
        const criticalSymptomNum = Object.values(criticalSymptoms.watch()).filter(v => (v === true)).length;
        const feverSymptomsNum = Object.keys(feverSymptoms.watch()).filter(v => (typeof (feverSymptoms.watch(v)) === "boolean" && feverSymptoms.watch(v) === true && v !== "fever")).length;
        console.log(feverSymptoms.watch("fever"), "feverrrrrr");
        console.log(criticalSymptomNum);
        console.log(feverSymptomsNum);
        console.log(suspectDengueValue.current);

        if (criticalSymptomNum >= 1 && feverSymptoms.watch("fever")) {
            console.log("critical", Object.values(criticalSymptoms.watch()).filter(v => (v === true)).length);
            phase = Conclusion['criticalPhase'];
        } else if (feverSymptomsNum >= 2 && feverSymptoms.watch("fever")) {
            console.log("febrileeeee");
            phase = Conclusion['febrilePhase'];
        } else {
            if (criticalSymptomNum > 0 || feverSymptomsNum > 0) {
                console.log("ada simptom");
                if (probablyDengue.watch("liveHotspot") || probablyDengue.watch("travelHotspot")) {
                    phase = Conclusion['suspectDengue'];
                } else {
                    if (suspectDengueValue.current >= 2) {
                        phase = Conclusion['suspectDengue'];
                    } else {
                        phase = Conclusion['otherFever'];
                    }
                }
            } else {
                console.log("xde simptom");
                phase = Conclusion['notDengue'];
            }
        }
        let conclusionDialog: Dialog = {
            text: (
                <>
                    <span style={{ fontWeight: "bold" }}>{phase.conclusion[language]}</span>
                    <br /><br />
                    <span>{phase.summary[language]}</span>
                    {
                        phase.explanation !== undefined &&
                        <>
                            <br /><hr />
                            <span style={{ textDecorationLine: "underline", marginBottom: "5px", textUnderlineOffset: "3px", fontWeight: "bold" }}>{language === "en" ? "Explanation" : "Penerangan"}</span>
                            <br />
                            {phase.explanation[language](feverSymptoms.watch(), criticalSymptoms.watch(), probablyDengue.watch())}
                        </>
                    }
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
            timeout.current.push(setTimeout(() => {
                if (typeof (Answer[id].answer[choice].nextQuestionID) === 'number') {
                    addQuestionDialog(Answer[id].answer[choice].nextQuestionID);
                }
            }, (screen.width > 800 ? newDialog.text.length * 40 : 1000)))
        } else {
            timeout.current.push(setTimeout(() => {
                if (id === 3 && feverSymptoms.watch("vomiting")) {
                    addQuestionDialog(7);
                    return;
                }
                if (typeof (Answer[id].answer[choice].nextQuestionID) === 'number') {
                    addQuestionDialog(Answer[id].answer[choice].nextQuestionID);
                }
            }, (500)))
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
                timeout.current.push(setTimeout(() => {
                    const choiceDialog = {
                        text: Question[id].choice(getAnswer, language, setter),
                        type: "user",
                        id: getRandomNumber()
                    }
                    addDialog(choiceDialog);
                }, (screen.width > 800 ? botDialog.text.length * 40 : 1000)))
            } else {
                timeout.current.push(setTimeout(() => {
                    addQuestionDialog(id + 1).then(res => {
                        if (res && id === 14) {
                            generateConclusion()
                        }
                    });
                }, (screen.width > 800 ? botDialog.text.length * 40 : 1000)))
            }
        }
        return true
    }

    useEffect(() => {
        localStorage.setItem("lang", language);
        addQuestionDialog(0);
    }, [language])

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
            <ChatHeader language={language} setLanguage={setChatLanguage} title='DengueDiag Bot' reloadChat={() => window.location.reload()} />
            <ChatBody dialog={dialog} />
        </ChatContainer>
    )
}