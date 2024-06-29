
interface answerValue {
    [key: string]: string | number,
    en: string,
    my: string,
    value: string | number,
    nextQuestionID: number
}

interface AnswerTemplate {
    answer: Array<answerValue>,
}

const Answer: Array<AnswerTemplate> = [
    { // Answer 0
        answer: [
            {
                'en': "Help me diagnose a dengue.",
                'my': "Bantu saya mendiagnosis denggi",
                'value': 1,
                nextQuestionID: 1
            },
            {
                'en': "Tell me about dengue.",
                'my': "Beritahu saya lebih lanjut tentang denggi.",
                'value': 2,
                nextQuestionID: 0
            }
        ],
    },
    { // Answer 1
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 3
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 4
            }
        ],
    },
    { // Answer 2
        answer: [
            {
                'en': "",
                'my': "",
                'value': 1,
                nextQuestionID: 4
            }
        ],
    },
    { // Answer 3
        answer: [
            {
                'en': "",
                'my': "",
                'value': 1,
                nextQuestionID: 5
            }
        ],
    },
    { // Answer 4 - for mengalami ruam2
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 6
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 6
            }
        ],
    },
    { // Answer 5 - pendarahan mukosa
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 8
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 8
            }
        ],
    },
    { // Answer 6
        answer: [
            {
                'en': "",
                'my': "",
                'value': 1,
                nextQuestionID: 5
            }
        ],
    },
    { // Answer 7
        answer: [
            {
                'en': "",
                'my': "",
                'value': 1,
                nextQuestionID: 9
            }
        ],
    },
    { // Answer 8 
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 10
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 10
            }
        ],
    },
    { // Answer 9 
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 11
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 11
            },
        ],
    },
    { // Answer 10 
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 12
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 12
            },
            {
                'en': "Not Sure.",
                'my': "Tidak Pasti.",
                'value': 0,
                nextQuestionID: 12
            }
        ],
    },
    { // Answer 11 
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 13
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 13
            },
            {
                'en': "Not Sure.",
                'my': "Tidak Pasti.",
                'value': 0,
                nextQuestionID: 13
            }
        ],
    },
]


export default Answer;