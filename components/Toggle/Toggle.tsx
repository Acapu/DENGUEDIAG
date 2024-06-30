import './style.css'

interface props {
    language: string;
    setLanguage: Function;
}

export default function Toggle({ language, setLanguage }: props) {
    return (
        <div className='toggle-container' onClick={() => {
            setLanguage()
        }}>
            <span className={`${language === "my" ? "toggle-text-my" : "toggle-text-en"}`}>{language.toUpperCase()}</span>
            <div className={`toggle ${language === "my" ? "toggle-left" : "toggle-right"}`} />
        </div>
    )
}