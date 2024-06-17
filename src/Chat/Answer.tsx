
interface answerValue {
    [key: string]: string | number,
    // my: string,
    // value: string | number,
    // nextQuestionID: number
}

interface AnswerTemplate {
    answer: Array<answerValue>,
    nextQuestionID: number
}

const Answer: Array<AnswerTemplate> = [
    {
        answer: [
            {
                'en': "Help me diagnosis a dengue.",
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
        nextQuestionID: 1
    }
]


export default Answer;