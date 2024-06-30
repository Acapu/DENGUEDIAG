
import './QuestionStyle.css'
import ruam from '/ruam.jpg'
import bleedingMucose from '/bleedingMucose.jpg';
import FilteredPicture from 'components/FilteredPicture'
import { ReactElement } from 'react';

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
        'choice': (getAnswer: Function, lang: string, setFeverDays?: Function) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const feverDays = document.getElementById('fever-days') as HTMLInputElement;
                getAnswer(2, 0, feverDays.value + (lang === "en" ? " day(s)." : " hari."));
                if (setFeverDays !== undefined) setFeverDays(parseInt(feverDays.value));
            }} >
                <input id='fever-days' type="number" className='number-question' min={1} max={20} /> {lang === "en" ? "day(s)" : "hari"}.
            </form>
        )
    },
    {
        'questionID': 4,
        'question': {
            "en": (
                <>
                    <span>Are you currently experiencing any of the following symptoms?</span>
                    <ul>
                        <li>Body Ache</li>
                        <li>Vomiting</li>
                        <li>Headache</li>
                    </ul>
                </>
            ),
            "my": (
                <>
                    <span>Adakah anda sedang mengalami mana-mana simptom berikut?</span>
                    <ul>
                        <li>Sakit Badan</li>
                        <li>Muntah - muntah</li>
                        <li>Sakit Kepala</li>
                    </ul>
                </>
            ),
        },
        'choice': (getAnswer: Function, lang: string, setOtherFeverSymptoms?: Function) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const elements = Array.from(target.elements).filter(v => v.id);
                let answer: ReactElement | string = (
                    <>
                        <span>
                            {lang === "en" ?
                                "I am currently/have experience this symptom(s)" :
                                "saya pernah/sedang mengalami simptom berikut."
                            }
                        </span>
                        <ul>
                            {
                                elements.flatMap((v, i) => {
                                    const inputele = v as HTMLInputElement;
                                    if (inputele.checked) {
                                        return <li key={i + new Date().getMilliseconds()}>{inputele.value}</li>
                                    }
                                    return [];
                                })
                            }
                        </ul>
                    </>
                );
                if (elements.every((v) => !(v as HTMLInputElement).checked)) {
                    answer = lang === "en" ? "I never had any of the symptoms." : "Saya tidak mengalami simptom-simptom ini."
                }
                if (setOtherFeverSymptoms !== undefined) setOtherFeverSymptoms({
                    bodyache: (target.elements[0] as HTMLInputElement).checked,
                    vomiting: (target.elements[1] as HTMLInputElement).checked,
                    headache: (target.elements[2] as HTMLInputElement).checked,
                })
                getAnswer(3, 0, answer);
            }} >
                <div>
                    <span>{lang === 'en' ? "Tick any of the symptoms." : "Tandakan mana-mana gejala."}</span>
                    <div style={{ display: "flex", flexDirection: "column", rowGap: "7px" }}>
                        <div>
                            <input id='body-ache-input' type='checkbox' value={lang === 'en' ? "Body Ache" : "Sakit Badan"} />
                            <label htmlFor='body-ache-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Body Ache" : "Sakit Badan"}</label>
                        </div>
                        <div>
                            <input id='vomiting-input' type='checkbox' value={lang === 'en' ? "Vomiting" : "Muntah - muntah"} />
                            <label htmlFor='vomiting-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Vomiting" : "Muntah - muntah"}</label>
                        </div>
                        <div>
                            <input id='headache-input' type='checkbox' value={lang === 'en' ? "Headache" : "Sakit Kepala"} />
                            <label htmlFor='headache-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Headache" : "Sakit Kepala"}</label>
                        </div>
                    </div>
                    <button id='fever-symptom-submit' type='submit' style={{ marginTop: "7px" }}>Proceed</button>
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
        'choice': (getAnswer: Function, lang: string, setRash?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(4, 0)
                    if (setRash !== undefined) setRash();
                }} style={{ backgroundColor: "green" }}>{lang === "en" ? "Yes" : "Ya"}</button>
                <button onClick={() => getAnswer(4, 1)}>{lang === "en" ? "No" : "Tidak"}</button>
            </div>
        )
    },
    {
        'questionID': 6,
        'question': {
            "en": (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}>
                Do you have any bleeding from your gums or nose?
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
                Adakah anda mengalami sebarang pendarahan pada gusi atau hidung anda?
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
        'choice': (getAnswer: Function, lang: string, setBleedingMucose?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(5, 0)
                    if (setBleedingMucose !== undefined) setBleedingMucose()
                }} style={{ backgroundColor: "green" }}>{lang === "en" ? "Yes" : "Ya"}</button>
                <button onClick={() => getAnswer(5, 1)}>{lang === "en" ? "No" : "Tidak"}</button>
            </div>
        )
    },
    {
        'questionID': 7,
        'question': {
            "en": "How often do you vomit in a day?",
            "my": "Berapa kerap anda muntah-muntah dalam sehari?"
        },
        'choice': (getAnswer: Function, lang: string, setVomitingDays?: Function) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const vomitingDays = document.getElementById('vomiting-days') as HTMLInputElement;
                getAnswer(6, 0, vomitingDays.value + (lang === "en" ? " time(s) in a day." : " kali dalam sehari."));
                if (setVomitingDays !== undefined) setVomitingDays(parseInt(vomitingDays.value));
            }} >
                <input id='vomiting-days' type="number" className='number-question' min={1} max={20} /> {lang === "en" ? " time(s) in a day" : "kali dalam sehari"}.
            </form>
        )
    },
    {
        'questionID': 8,
        'question': {
            "en": (
                <>
                    <span>Beside the symptoms above, have you also experience any of this symptoms?</span>
                    <ul>
                        <li>Persistent diarrhoea</li>
                        <li>Abdominal pain (heartburn)</li>
                        <li>Difficulty breathing</li>
                    </ul>
                </>
            ),
            "my": (
                <>
                    <span>Selain simptom di atas, adakah anda juga pernah mengalami simptom ini?</span>
                    <ul>
                        <li>Cirit birit berterusan</li>
                        <li>Sakit pada bahagian perut (ulu hati)</li>
                        <li>Sukar bernafas</li>
                    </ul>
                </>
            ),
        },
        'choice': (getAnswer: Function, lang: string, setCriticalSymptoms?: Function) => (
            <form style={{ display: "flex", gap: "5px" }} onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const elements = Array.from(target.elements).filter(v => v.id);
                let answer: ReactElement | string = (
                    <>
                        <span>
                            {lang === "en" ?
                                "I am currently/have experience this symptom(s)" :
                                "saya pernah/sedang mengalami simptom-simptom berikut."
                            }</span>
                        <ul>
                            {
                                elements.flatMap((v, i) => {
                                    const inputele = v as HTMLInputElement;
                                    if (inputele.checked) {
                                        return <li key={i + new Date().getMilliseconds()}>{inputele.value}</li>
                                    }
                                    return [];
                                })
                            }
                        </ul>
                    </>
                );
                if (elements.every((v) => !(v as HTMLInputElement).checked)) {
                    answer = lang === "en" ? "I never had any of the symptoms." : "Saya tidak mengalami simptom-simptom ini."
                }
                if (setCriticalSymptoms !== undefined) setCriticalSymptoms({
                    persistentdiarrhoea: (target.elements[0] as HTMLInputElement).checked,
                    stomachpain: (target.elements[1] as HTMLInputElement).checked,
                    difficultyBreathing: (target.elements[2] as HTMLInputElement).checked,
                })
                getAnswer(7, 0, answer);
            }} >
                <div>
                    <span>{lang === 'en' ? "Tick any of the symptoms." : "Tandakan mana-mana gejala."}</span>
                    <div style={{ display: "flex", flexDirection: "column", rowGap: "7px" }}>
                        <div>
                            <input id='persistentdiarrhoea-input' type='checkbox' value={lang === 'en' ? "Persistent diarrhoea" : "Cirit birit berterusan"} />
                            <label htmlFor='persistentdiarrhoea-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Persistent diarrhoea" : "Cirit birit berterusan"}</label>
                        </div>
                        <div>
                            <input id='stomachpain-input' type='checkbox' value={lang === 'en' ? "Abdominal pain" : "Sakit pada bahagian perut (ulu hati)"} />
                            <label htmlFor='stomachpain-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Abdominal pain (heartburn)" : "Sakit pada bahagian perut (ulu hati)"}</label>
                        </div>
                        <div>
                            <input id='difficultyBreathing-input' type='checkbox' value={lang === 'en' ? "Difficulty breathing" : "Sukar bernafas"} />
                            <label htmlFor='difficultyBreathing-input' style={{ margin: "0 2px" }}>{lang === 'en' ? "Difficulty breathing" : "Sukar bernafas"}</label>
                        </div>
                    </div>
                    <button id='critical-symptoms-submit' type='submit' style={{ marginTop: "7px" }}>Proceed</button>
                </div>
            </form>
        )
    },
    {
        'questionID': 9,
        'question': {
            "en": "Are you feeling agitated or restless right now?",
            "my": "Adakah anda berasa gelisah atau resah sekarang?"
        },
        'choice': (getAnswer: Function, lang: string, setExtremeFatigue?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(8, 0);
                    if (setExtremeFatigue !== undefined) setExtremeFatigue();
                }} style={{ backgroundColor: "green" }}>
                    {lang === "en" ? "Yes" : "Ya"}
                </button>
                <button onClick={() => getAnswer(8, 1)}>
                    {lang === "en" ? "No" : "Tidak"}
                </button>
            </div>
        )
    },
    {
        'questionID': 10,
        'question': {
            "en": "Have you noticed any changes in your level of consciousness?",
            "my": "Adakah anda perasan sebarang perubahan dalam tahap kesedaran anda?"
        },
        'choice': (getAnswer: Function, lang: string, setLowConsciousness?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(9, 0)
                    if (setLowConsciousness !== undefined) setLowConsciousness()
                }} style={{ backgroundColor: "green" }}>
                    {lang === "en" ? "Yes" : "Ya"}
                </button>
                <button onClick={() => getAnswer(9, 1)}>
                    {lang === "en" ? "No" : "Tidak"}
                </button>
            </div>
        )
    },
    {
        'questionID': 11,
        'question': {
            "en": "Do you live in a hotspot dengue area?",
            "my": "Adakah anda tinggal di kawasan hotspot denggi?"
        },
        'choice': (getAnswer: Function, lang: string, setLiveInHotspot?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(10, 0);
                    if (setLiveInHotspot !== undefined) setLiveInHotspot();
                }} style={{ backgroundColor: "green" }}>
                    {lang === "en" ? "Yes" : "Ya"}
                </button>
                <button onClick={() => getAnswer(10, 1)}>
                    {lang === "en" ? "No" : "Tidak"}
                </button>
                <button onClick={() => getAnswer(10, 2)} style={{ backgroundColor: "yellow", color: "black" }}>
                    {lang === "en" ? "Not Sure" : "Tidak Pasti"}
                </button>
            </div>
        )
    },
    {
        'questionID': 12,
        'question': {
            "en": "Lastly, have you traveled to a dengue fever outbreak area recently?",
            "my": "Akhir sekali, adakah anda pergi ke kawasan wabak demam denggi baru-baru ini?"
        },
        'choice': (getAnswer: Function, lang: string, setTraveltoHotspot?: Function) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <button onClick={() => {
                    getAnswer(11, 0);
                    if (setTraveltoHotspot !== undefined) setTraveltoHotspot()
                }} style={{ backgroundColor: "green" }}>
                    {lang === "en" ? "Yes" : "Ya"}
                </button>
                <button onClick={() => getAnswer(11, 1)}>
                    {lang === "en" ? "No" : "Tidak"}
                </button>
                <button onClick={() => getAnswer(11, 2)} style={{ backgroundColor: "yellow", color: "black" }}>
                    {lang === "en" ? "Not Sure" : "Tidak Pasti"}
                </button>
            </div>
        )
    },
    {
        'questionID': 13,
        'question': {
            "en": "Thank you for answering all the question.",
            "my": "Terima kasih kerana menjawab semua soalan."
        },
        'choice': null
    },
    {
        'questionID': 14,
        'question': {
            "en": "Based on the answer you provided...",
            "my": "Berdasarkan jawapan yang anda berikan"
        },
        'choice': null
    },
]

export default Question;