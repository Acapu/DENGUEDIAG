


interface ConclusionTemplate {
    conclusion: any,
    addition?: any,
    explanation: any,
    summary?: any
}

interface ConclusionObject {
    [key: string]: ConclusionTemplate
}

const Conclusion: ConclusionObject = {
    "notDengue": {
        conclusion: {
            'en': "Sorry, you probably does not have dengue or any fever/infection right now.",
            'my': 'Maaf, anda mungkin tidak menghidap denggi atau sebarang demam/jangkitan sekarang.'
        },
        explanation: {
            'en': "",
            'my': ''
        },
        summary: {
            'en': "If you have any other symptoms that was not asked here, please consider going to your nearest medical clinic and get medical checkup for more accurate check and early treatment. ",
            'my': 'Jika anda mempunyai sebarang simptom lain yang tidak ditanya di sini, sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan pemeriksaan kesihatan untuk pemeriksaan yang lebih tepat dan rawatan awal.'
        }
    },
    "suspectDengue": {
        conclusion: {
            'en': "You may be suspected of having dengue because (your place is a dengue hotspot/you have been to a dengue epidemic area) plus the symptoms provided.",
            'my': 'Anda mungkin disyaki menghidap denggi kerana (tempat anda adalah hotspot denggi/anda pernah ke kawasan wabak denggi) ditambah lagi dengan simptom yang diberikan.'
        },
        explanation: {
            'en': "",
            'my': ''
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get a treatment/medical checkup for more accurate check from the doctor.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan rawatan/pemeriksaan perubatan untuk pemeriksaan lebih tepat daripada doktor.'
        }
    },
    "febrilePhase": {
        conclusion: {
            'en': "You may have been infected with dengue and in early phase of the infection.",
            'my': 'Anda mungkin telah dijangkiti denggi dan pada fasa awal jangkitan.'
        },
        explanation: {
            'en': "",
            'my': ''
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get medical checkup for more accurate check and early treatment.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan pemeriksaan perubatan untuk pemeriksaan yang lebih tepat dan rawatan awal.'
        },
    },
    "criticalPhase": {
        conclusion: {
            'en': "You may have been infected with dengue and requires a medical checkup.",
            'my': 'Anda mungkin telah dijangkiti denggi dan memerlukan rawatan dan nasihat pakar.'
        },
        explanation: {
            'en': "",
            'my': ''
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get a treatment for more accurate check.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan rawatan untuk pemeriksaan yang lebih tepat.'
        },
    },
    "otherFever": {
        conclusion: {
            'en': "Currently you are not infected by dengue and might infected by other disease based on the symptoms.",
            'my': 'Pada masa ini anda tidak dijangkiti denggi dan mungkin dijangkiti penyakit lain berdasarkan simptom yang dinyatakan.'
        },
        explanation: {
            'en': "",
            'my': ''
        },
        summary: {
            'en': "Please consider going to your nearest medical clinic and get a treatment/medical checkup for more accurate check from the doctor.",
            'my': 'Sila pertimbangkan untuk pergi ke klinik perubatan terdekat anda dan dapatkan rawatan/pemeriksaan perubatan untuk pemeriksaan lebih tepat daripada doktor.'
        },
    },
}

export default Conclusion