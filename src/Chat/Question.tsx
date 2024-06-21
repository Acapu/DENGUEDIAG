
import './QuestionStyle.css'
import ruam from '/ruam.jpg'
import FilteredPicture from 'components/FilteredPicture'

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
        'choice': (getAnswer: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(0, 0)}>Dengue Diagnosis</button>
                <button onClick={() => getAnswer(0, 1)}>Tell me about dengue.</button>
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
        'choice': (getAnswer: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(1, 0)} style={{ backgroundColor: "green" }}>Yes</button>
                <button onClick={() => getAnswer(1, 1)}>No</button>
            </div>
        )
    },
    {
        'questionID': 3,
        'question': {
            "en": "How many days have you had a fever?",
            "my": "Berapa hari anda sudah demam?"
        },
        'choice': (getAnswer: Function) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const feverDays = document.getElementById('fever-days') as HTMLInputElement;
                getAnswer(2, 0, feverDays.value + " days.");
            }} >
                <input id='fever-days' type="number" className='number-question' min={1} max={20} /> day.
            </form>
        )
    },
    { // if does not have any fever
        'questionID': 4,
        'question': {
            "en": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Do you have rashes at any part of your body as the picture below?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`ruam-picture-${new Date().getMilliseconds()}`} warningID={`ruam-container-warning-${new Date().getMilliseconds()}`}
                        img={ruam} alt='Ruam/Rashes'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
            "my": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Adakah anda mengalami ruam di mana-mana bahagian badan anda seperti gambar di bawah?
                <div style={{ width: "fit-content", position: "relative" }}>
                    <FilteredPicture imgID={`ruam-picture-${new Date().getMilliseconds()}`} warningID={`ruam-container-warning-${new Date().getMilliseconds()}`}
                        img={ruam} alt='Ruam/Rashes'
                        source='https://tipsinfosihat.blogspot.com/2015/01/penyakit-demam-denggi.html'
                        sourceTitle='TipsInfoSihat - Maklumat Kesihatan Dan Penjagaan Diri'
                    />
                </div>
            </div>),
        },
        'choice': (getAnswer: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => getAnswer(3, 0)} style={{ backgroundColor: "green" }}>Yes</button>
                <button onClick={() => getAnswer(3, 1)}>No</button>
            </div>
        )
    },
]

export default Question;