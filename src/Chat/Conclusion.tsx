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
        explanation: " is one of the clinical warning of dengue infection.",
        explained: false,
    },
    gastrointestinalSystem: {
        symptoms: ["multipleVomiting", "persistentdiarrhoea", "stomachpain"],
        explanation: " might indicate there is a clinical deterioration in your gastrointestinal system.",
        explained: false,
    },
    centralNervousSystem: {
        symptoms: ["lowConsciousness", "extremeFatigue"],
        explanation: " could suggest a declining rate in your nervous system.",
        explained: false,
    },
    respiratorySystem: {
        symptoms: ["difficultyBreathing"],
        explanation: " might indicate that you are having tachypnea(shallow breathing) that can be sign of medical emergency.",
        explained: false,
    }
}

const feverKey: { [key: string]: any } = {
    fever: "Fever", vomiting: "Vomiting",
    headache: "Head ache", bodyache: "Body ache", rash: "Rash"
}

const criticalKey: { [key: string]: any } = {
    bleedingMucose: "Bleeding Mucose",
    multipleVomiting: "Persistent Vomitting",
    persistentdiarrhoea: "Persistent Diarrhoea",
    stomachpain: "Abdominal Pain",
    difficultyBreathing: "Difficulty Breathing",
    lowConsciousness: "Low Consciousness",
    extremeFatigue: "Lethargy/Restlessness",
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
                                <span style={{ padding: "0px 5px" }}>-&gt; <span style={{ fontWeight: "bold" }}>{Object.keys(feverSymptoms).filter(v => (feverKey[v] !== undefined && feverSymptoms[v])).map(v => (feverKey[v])).join(", ")}</span> is a possible symptom(s) for dengue infection.</span>
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
                                                symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]));
                                                return (
                                                    <li key={i}>
                                                        <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                    </li>
                                                )
                                            }
                                            return []
                                        })
                                    }
                                    <li style={{ color: "orange" }}>These symptoms can be a sign of plasma leakage that indicates dengue infection.</li>
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
                                <span style={{ padding: "0px 5px" }}>-&gt; <span style={{ fontWeight: "bold" }}>{Object.keys(feverSymptoms).filter(v => (feverKey[v] !== undefined && feverSymptoms[v])).map(v => (feverKey[v])).join(", ")}</span> adalah simptom yang mungkin untuk jangkitan denggi.</span>
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
                                                symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]));
                                                return (
                                                    <li key={i}>
                                                        <span style={{ fontWeight: "bold" }}>{symptoms.join(", ") + " "}</span>
                                                    </li>
                                                )
                                            }
                                            return []
                                        })
                                    }
                                    <li style={{ color: "orange" }}>Gejala ini boleh menjadi tanda kebocoran plasma yang menunjukkan jangkitan denggi.</li>
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
            'en': (feverSymptoms: FeverSymptoms) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; You currently have this following early phase dengue symptoms :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]}</li>;
                                    }
                                    return []
                                })
                            }
                        </ul>
                        <span>- Early phase symptoms typically occur within 1 to 2 days of fever. -</span>
                    </>
                )
            },
            'my': () => {

            }
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
            'en': (feverSymptoms: FeverSymptoms, criticalSymptoms: CriticalSymptoms) => {
                return (
                    <>
                        <span style={{ padding: "0px 5px" }}>-&gt; You currently have this following dengue symptoms :</span>
                        <ul>
                            {
                                Object.keys(feverSymptoms).flatMap((v, i) => {
                                    if (feverKey[v] !== undefined && feverSymptoms[v]) {
                                        return <li key={i}>{feverKey[v]}</li>;
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
                                        symptoms = symptomExp.symptoms.filter((v: string) => (criticalSymptoms[v])).map((v: string) => (criticalKey[v]));
                                        explanation = symptomExp.explanation;
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
                            <li style={{ color: "orange" }}>All these symptoms can be a sign of plasma leakage that indicates dengue infection.</li>
                        </ul>
                    </>
                )
            },
            'my': () => {

            }
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