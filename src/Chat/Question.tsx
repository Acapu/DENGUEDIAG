
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
            "en": "Testing jadi tak.",
            "my": "hmmmmmm."
        },
        'choice': null
    }
]

export default Question;