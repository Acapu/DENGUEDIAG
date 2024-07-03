import { FeverSymptoms, CriticalSymptoms, AdditionalDengueInfo } from "."


interface ConclusionTemplate {
    conclusion: any,
    addition?: any,
    explanation?: any,
    summary?: any
}

interface ConclusionObject {
    [key: string]: ConclusionTemplate
}

interface ExplanationTemplate {
    [key: string]: any,
}

const Explanation: ExplanationTemplate = {
    bleedingMucose: {
        symptoms: ["bleedingMucose"],
        explanation: {
            "en": " is one of the clinical warning of dengue infection.",
            "my": " adalah salah satu simptom klinikal jangkitan denggi."
        },
        explained: false,
    },
    gastrointestinalSystem: {
        symptoms: ["multipleVomiting", "persistentdiarrhoea", "stomachpain"],
        explanation: {
            "en": " might indicate there is a clinical deterioration in your gastrointestinal system.",
            "my": " mungkin menunjukkan terdapat kemerosotan klinikal dalam sistem gastrousus anda."
        },
        explained: false,
    },
    centralNervousSystem: {
        symptoms: ["lowConsciousness", "extremeFatigue"],
        explanation: {
            "en": " could suggest a declining rate in your nervous system.",
            "my": " boleh mencadangkan terdapat kemerosotan dalam sistem saraf pusat anda."
        },
        explained: false,
    },
    respiratorySystem: {
        symptoms: ["difficultyBreathing"],
        explanation: {
            "en": " might indicate that you are having tachypnea (shallow breathing) that can be sign of medical emergency.",
            "my": " mungkin menunjukkan bahawa anda sedang mengalami tachypnea (pernafasan laju) yang memerlukan perhatian segera."
        },
        explained: false,
    }
}

const feverKey: { [key: string]: any } = {
    fever: { "en": "Fever", "my": "Demam" }, vomiting: { "en": "Vomiting", "my": "Muntah-muntah" },
    headache: { "en": "Head ache", "my": "Sakit kepala" }, bodyache: { "en": "Body ache", "my": "Sakit badan" },
    rash: { "en": "Rash", "my": "Ruam" }
}

const criticalKey: { [key: string]: any } = {
    bleedingMucose: { "en": "Bleeding Mucose", "my": "Pendarahan mukosa (Hidung/Gusi)" },
    multipleVomiting: { "en": "Persistent Vomitting", "my": "Muntah berterusan" },
    persistentdiarrhoea: { "en": "Persistent Diarrhoea", "my": "Cirit-birit berterusan" },
    stomachpain: { "en": "Abdominal Pain", "my": "Sakit pada bahagian perut" },
    difficultyBreathing: { "en": "Difficulty Breathing", "my": "Sukar Bernafas" },
    lowConsciousness: { "en": "Low Consciousness", "my": "Kesedaran yang berkurang" },
    extremeFatigue: { "en": "Lethargy/Restlessness", "my": "Resah/Gelisah" },
}

const Conclusion: ConclusionObject = {
    "notDengue": {
        conclusion: {
            'en': "Sorry, you probably does not have dengue or any fever/infection right now.",
            'my': 'Maaf, anda mungkin tidak menghidap denggi atau sebarang demam/jangkitan sekarang.'
        },
        summary: {
            'en': "If you have any other symptoms that was not asked here, please consider going to your nearest medical clinic and get medical checkup for more accurate check and early treatment. ",
            'my': 'Jika anda mempunyai sebarang simptom lain yang tidak ditanya di sini, sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan pemeriksaan kesihatan untuk pemeriksaan yang lebih tepat dan rawatan awal.'
        }
    },
    "suspectDengue": {
        conclusion: {
            'en': "You are not being infected by dengue right now, but you could be a potential dengue suspect because of the symptoms or the environment that you live in.",
            'my': 'Anda tidak dijangkiti denggi sekarang, tetapi anda boleh menjadi suspek denggi yang berpotensi kerana gejala atau persekitaran yang anda tinggali.'
        },
        explanation: {
            'en': (feverSymptoms: FeverSymptoms, criticalSymptoms: CriticalSymptoms, probablyDengue?: AdditionalDengueInfo) => {
                return (
                    <>
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Since you live in a dengue hotspot area, there is a high chance of you being infected</span>
                                    }
                                    <br />
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Travelling to a dengue hotspot area can increase the risk of being infected</span>
                                    }
                                    <br />
                                </>
                            )
                        }
                        {
                            Object.values(feverSymptoms).some(v => (typeof (v) === "boolean" && v)) &&
                            <>
                                <span style={{ padding: "0px 5px" }}>-&gt; <span style={{ fontWeight: "bold" }}>{Object.keys(feverSymptoms).filter(v => (feverKey[v] !== undefined && feverSymptoms[v])).map(v => (feverKey[v]['en'])).join(", ")}</span> is a possible symptom(s) for dengue infection.</span>
                                <br />
                            </>
                        }
                        {
                            Object.values(criticalSymptoms).some(v => (v)) &&
                            <>
                                <span style={{ padding: "0px 5px" }}>-&gt; Symptoms that requires immediate attention : </span>
                                <ul>
                                    {
                                        Object.keys(criticalSymptoms).flatMap((k, i) => {
                                            let symptoms: Array<string> = [];
                                            const symptomExp = Explanation[Object.keys(Explanation).find((v) => {
                                                return criticalSymptoms[k] && Explanation[v].symptoms.includes(k)
                                            }) || ""]
                                            if (symptomExp !== undefined && !symptomExp?.explained) {
                                                symptomExp.explained = true;
                                                symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]['en']));
                                                return (
                                                    <li key={i}>
                                                        <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                    </li>
                                                )
                                            }
                                            return []
                                        })
                                    }
                                    <li style={{ color: "orange" }}>Some of these symptoms can be a sign of plasma leakage that indicates dengue infection.</li>
                                </ul>
                            </>
                        }
                    </>
                )
            },
            'my': (feverSymptoms: FeverSymptoms, criticalSymptoms: CriticalSymptoms, probablyDengue?: AdditionalDengueInfo) => {
                return (
                    <>
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Memandangkan anda tinggal di kawasan hotspot denggi, terdapat kemungkinan besar anda dijangkiti</span>
                                    }
                                    <br />
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Perjalanan ke kawasan hotspot denggi boleh meningkatkan risiko dijangkiti</span>
                                    }
                                    <br />
                                </>
                            )
                        }
                        {
                            Object.values(feverSymptoms).some(v => (typeof (v) === "boolean" && v)) &&
                            <>
                                <span style={{ padding: "0px 5px" }}>-&gt; <span style={{ fontWeight: "bold" }}>{Object.keys(feverSymptoms).filter(v => (feverKey[v] !== undefined && feverSymptoms[v])).map(v => (feverKey[v]['my'])).join(", ")}</span> adalah simptom yang mungkin untuk jangkitan denggi.</span>
                                <br />
                            </>
                        }
                        {
                            Object.values(criticalSymptoms).some(v => (v)) &&
                            <>
                                <span style={{ padding: "0px 5px" }}>-&gt; Gejala yang memerlukan perhatian segera: </span>
                                <ul>
                                    {
                                        Object.keys(criticalSymptoms).flatMap((k, i) => {
                                            let symptoms: Array<string> = [];
                                            const symptomExp = Explanation[Object.keys(Explanation).find((v) => {
                                                return criticalSymptoms[k] && Explanation[v].symptoms.includes(k)
                                            }) || ""]
                                            if (symptomExp !== undefined && !symptomExp?.explained) {
                                                symptomExp.explained = true;
                                                symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]['my']));
                                                return (
                                                    <li key={i}>
                                                        <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                    </li>
                                                )
                                            }
                                            return []
                                        })
                                    }
                                    <li style={{ color: "orange" }}>Sesetengah gejala ini boleh menjadi tanda kebocoran plasma yang menunjukkan jangkitan denggi.</li>
                                </ul>
                            </>
                        }
                    </>
                )
            },
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get a treatment/medical checkup for more accurate check from the doctor.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan rawatan/pemeriksaan perubatan untuk pemeriksaan lebih tepat daripada doktor.'
        }
    },
    "febrilePhase": {
        conclusion: {
            'en': "You may have been infected with an early phase of dengue infection.",
            'my': 'Anda mungkin telah dijangkiti denggi dan pada fasa awal jangkitan.'
        },
        explanation: {
            'en': (feverSymptoms: FeverSymptoms, _: any, probablyDengue?: AdditionalDengueInfo ) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; You currently have this following early phase dengue symptoms :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]['en']}</li>;
                                    }
                                    return []
                                })
                            }
                        </ul>
                        <span>- Early phase symptoms usually occur within 1 to 2 days of fever. -</span>
                        <br />
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    <br />
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Since you live in a dengue hotspot area, there is a high chance of you being infected</span>
                                    }
                                    <br/>
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Travelling to a dengue hotspot area can increase the risk of being infected</span>
                                    }
                                </>
                            )
                        }
                    </>
                )
            },
            'my': (feverSymptoms: FeverSymptoms, _: any, probablyDengue?: AdditionalDengueInfo) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; Anda sekarang sedang mengalami simptom denggi fasa awal berikut :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]['my']}</li>;
                                    }
                                    return []
                                })
                            }
                        </ul>
                        <span>- Gejala fasa awal biasanya berlaku dalam tempoh 1 hingga 2 hari demam. -</span>
                        <br />
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    <br />
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Memandangkan anda tinggal di kawasan hotspot denggi, terdapat kemungkinan besar anda dijangkiti.</span>
                                    }
                                    <br />
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Perjalanan ke kawasan hotspot denggi boleh meningkatkan risiko dijangkiti.</span>
                                    }
                                </>
                            )
                        }
                    </>
                )
            },
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get medical checkup for more accurate check and early treatment as it can be other diseases.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan pemeriksaan kesihatan untuk pemeriksaan yang lebih tepat dan rawatan awal kerana ia boleh menjadi penyakit lain.'
        },
    },
    "criticalPhase": {
        conclusion: {
            'en': "You may have been infected with dengue and requires a medical treatment.",
            'my': 'Anda mungkin telah dijangkiti denggi dan memerlukan rawatan dan nasihat pakar.'
        },
        explanation: {
            'en': (feverSymptoms: FeverSymptoms, criticalSymptoms: CriticalSymptoms, probablyDengue?: AdditionalDengueInfo) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; You currently have this following dengue symptoms :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]['en']}</li>;
                                    }
                                    return []
                                })
                            }
                        </ul>
                        <br />
                        <span style={{ padding: "0px 5px" }}>-&gt; Symptoms that requires immediate attention : </span>
                        <ul>
                            {
                                Object.keys(criticalSymptoms).flatMap((k, i) => {
                                    let symptoms: Array<string> = [];
                                    let explanation = "";
                                    const symptomExp = Explanation[Object.keys(Explanation).find((v) => {
                                        return criticalSymptoms[k] && Explanation[v].symptoms.includes(k)
                                    }) || ""]
                                    if (symptomExp !== undefined && !symptomExp?.explained) {
                                        symptomExp.explained = true;
                                        symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]['en']));
                                        explanation = symptomExp.explanation['en'];
                                        return (
                                            <li key={i}>
                                                <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                {explanation}
                                            </li>
                                        )
                                    }
                                    return []
                                })
                            }
                            <li style={{ color: "orange" }}>Some of these symptoms can be a sign of plasma leakage that indicates dengue infection.</li>
                        </ul>
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    <br />
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Since you live in a dengue hotspot area, there is a high chance of you being infected</span>
                                    }
                                    <br/>
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Travelling to a dengue hotspot area can increase the risk of being infected</span>
                                    }
                                </>
                            )
                        }
                    </>
                )
            },
            'my': (feverSymptoms: FeverSymptoms, criticalSymptoms: CriticalSymptoms, probablyDengue?: AdditionalDengueInfo) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; Anda sedang mempunyai simptom denggi berikut :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]['my']}</li>;
                                    }
                                    return []
                                })
                            }
                        </ul>
                        <br />
                        <span style={{ padding: "0px 5px" }}>-&gt; Gejala yang memerlukan perhatian segera : </span>
                        <ul>
                            {
                                Object.keys(criticalSymptoms).flatMap((k, i) => {
                                    let symptoms: Array<string> = [];
                                    let explanation = "";
                                    const symptomExp = Explanation[Object.keys(Explanation).find((v) => {
                                        return criticalSymptoms[k] && Explanation[v].symptoms.includes(k)
                                    }) || ""]
                                    if (symptomExp !== undefined && !symptomExp?.explained) {
                                        symptomExp.explained = true;
                                        symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]['my']));
                                        explanation = symptomExp.explanation['my'];
                                        return (
                                            <li key={i}>
                                                <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                {explanation}
                                            </li>
                                        )
                                    }
                                    return []
                                })
                            }
                            <li style={{ color: "orange" }}>Sesetengah gejala ini boleh menjadi tanda kebocoran plasma yang menunjukkan jangkitan denggi.</li>
                        </ul>
                        <br />
                        {
                            probablyDengue !== undefined && Object.values(probablyDengue).some(v => (v)) &&
                            (
                                <>
                                    <br />
                                    {probablyDengue.liveHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Memandangkan anda tinggal di kawasan hotspot denggi, terdapat kemungkinan besar anda dijangkiti.</span>
                                    }
                                    <br />
                                    {
                                        probablyDengue.travelHotspot &&
                                        <span style={{ padding: "0px 5px" }}>-&gt; Perjalanan ke kawasan hotspot denggi boleh meningkatkan risiko dijangkiti.</span>
                                    }
                                </>
                            )
                        }
                    </>
                )
            },
        },
        summary: {
            'en': "Please consider going to the nearest medical clinic and get a proper treatment.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat dan dapatkan rawatan yang sewajarnya.'
        },
    },
    "otherFever": {
        conclusion: {
            'en': "Currently you are not infected by dengue and might be infected by other disease based on the symptoms.",
            'my': 'Pada masa ini anda tidak dijangkiti denggi dan mungkin dijangkiti penyakit lain berdasarkan simptom yang dinyatakan.'
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get a treatment/medical checkup for more accurate check from the doctor.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan rawatan/pemeriksaan perubatan untuk pemeriksaan lebih tepat daripada doktor.'
        },
    },
}

export default Conclusion