
import './QuestionStyle.css'
import ruam from '/ruam.jpg'
import bleedingMucose from '/bleedingMucose.jpg';
import FilteredPicture from 'components/FilteredPicture'
import { ReactElement, SyntheticEvent } from 'react';

interface QuestionTemplate {
    questionID: number,
    question: any,
    choice: any
}

const Question: Array<QuestionTemplate> = [
    {
        'questionID': 0,
        'question': {
            "en": "Hello there, I am DengueDiag bot. How can I help you today?",
            "my": "Hai, saya DengueDiag bot. Apa yang boleh saya bantu anda?"
        },
        'choice': (getAnswer: Function, lang: "en") => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(0, 0)}>
                    {lang === "en" ? "Dengue Diagnosis" : "Diagnosis Denggi"}
                </button>
                <button onClick={() => getAnswer(0, 1)}>
                    {lang === "en" ? "Tell me about dengue." : "Beritahu saya lebih lanjut tentang denggi"}
                </button>
            </div>
        )
    },
    {
        'questionID': 1,
        'question': {
            "en": "Sure, let's proceed now.",
            "my": "Baiklah, mari mulakan diagnosa sekarang."
        },
        'choice': null
    },
    {
        'questionID': 2,
        'question': {
            "en": "Have you had a fever these past few days?",
            "my": "Adakah anda mengalami demam semenjak beberapa hari ini?"
        },
        'choice': (getAnswer: Function, lang: string) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(1, 0)} style={{ backgroundColor: "green" }}>
                    {lang === "en" ? "Yes" : "Ya"}
                </button>
                <button onClick={() => getAnswer(1, 1)}>
                    {lang === "en" ? "No" : "Tidak"}
                </button>
            </div>
        )
    },
    {
        'questionID': 3,
        'question': {
            "en": "How many days have you had a fever?",
            "my": "Berapa hari anda sudah demam?"
        },
        'choice': (getAnswer: Function, lang: string) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const feverDays = document.getElementById('fever-days') as HTMLInputElement;
                getAnswer(2, 0, feverDays.value + (lang === " en" ? "day(s)." : " hari."));
            }} >
                <input id='fever-days' type="number" className='number-question' min={1} max={20} /> {lang === "en" ? "day(s)" : "hari"}.
            </form>
        )
    },
    {
        'questionID': 4,
        'question': {
            "en": "Are you currently experiencing any of the following symptoms?",
            "my": "Adakah anda sedang mengalami mana-mana simptom berikut?"
        },
        'choice': (getAnswer: Function, lang: string) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const elements = Array.from(target.elements).filter(v => v.id);
                let answer: ReactElement | string = (<ul>
                    {
                        elements.flatMap((v, i) => {
                            const inputele = v as HTMLInputElement;
                            if (inputele.checked) {
                                return <li key={i + new Date().getMilliseconds()}>{inputele.value}</li>
                            }
                            return [];
                        })
                    }
                </ul>);
                if (elements.every((v) => !(v as HTMLInputElement).checked)) {
                    answer = "Never had any of the symptoms."
                }
                getAnswer(3, 0, answer);
            }} >
                <div>
                    <span>Tick any of the symptom.</span>
                    <div>
                        <div>
                            <input id='body-ache-input' type='checkbox' value={lang === 'en' ? "Body Ache" : "Sakit Badan"} />
                            <label htmlFor='body-ache-input' style={{ margin: "0 2px" }}>Body Ache</label>
                        </div>
                        <div>
                            <input id='vomitting-input' type='checkbox' value={lang === 'en' ? "Vomiting" : "Muntah - muntah"} />
                            <label htmlFor='vomitting-input' style={{ margin: "0 2px" }}>Vomiting</label>
                        </div>
                        <div>
                            <input id='headache-input' type='checkbox' value={lang === 'en' ? "Headache" : "Sakit Kepala"} />
                            <label htmlFor='headache-input' style={{ margin: "0 2px" }}>Headache</label>
                        </div>
                    </div>
                    <button type='submit' style={{ marginTop: "3px" }}>Proceed</button>
                </div>
            </form>
        )
    },
    {
        'questionID': 5,
        'question': {
            "en": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Do you have rashes at any part of your body as the picture below?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`ruam-picture-${new Date().getMilliseconds()}`} warningID={`ruam-container-warning-${new Date().getMilliseconds()}`}
                        img={ruam} alt='Rashes'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
            "my": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Adakah anda mengalami ruam di mana-mana bahagian badan anda seperti gambar di bawah?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`ruam-picture-${new Date().getMilliseconds()}`} warningID={`ruam-container-warning-${new Date().getMilliseconds()}`}
                        img={ruam} alt='Ruam'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
        },
        'choice': (getAnswer: Function, lang: string) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(4, 0)} style={{ backgroundColor: "green" }}>{lang === "en" ? "Yes" : "Ya"}</button>
                <button onClick={() => getAnswer(4, 1)}>{lang === "en" ? "No" : "Tidak"}</button>
            </div>
        )
    },
    {
        'questionID': 6,
        'question': {
            "en": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Do you have any bleeding from your gums and nose?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`bleedingMucose-picture-${new Date().getMilliseconds()}`}
                        warningID={`bleedingMucose-container-warning-${new Date().getMilliseconds()}`}
                        img={bleedingMucose} alt='Bleeding Mucose'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
            "my": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Adakah anda mengalami sebarang pendarahan pada gusi dan hidung anda?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`bleedingMucose-picture-${new Date().getMilliseconds()}`}
                        warningID={`bleedingMucose-container-warning-${new Date().getMilliseconds()}`}
                        img={bleedingMucose} alt='Pendarahan Mukosa'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
        },
        'choice': (getAnswer: Function, lang: string) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(5, 0)} style={{ backgroundColor: "green" }}>{lang === "en" ? "Yes" : "Ya"}</button>
                <button onClick={() => getAnswer(5, 1)}>{lang === "en" ? "No" : "Tidak"}</button>
            </div>
        )
    },
]

export default Question;