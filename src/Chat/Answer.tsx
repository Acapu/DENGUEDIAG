
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
                nextQuestionID: 2
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
    { // Answer 3 - for mengalami ruam2
        answer: [
            {
                'en': "Yes.",
                'my': "Ya.",
                'value': 1,
                nextQuestionID: 5
            },
            {
                'en': "No.",
                'my': "Tidak.",
                'value': 0,
                nextQuestionID: 6
            }
        ],
    },
]


export default Answer;