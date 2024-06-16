import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <div className='home-header'>
                <h1 className='main-title'><span className='dengue'>Dengue</span><span className='diag'>diag</span></h1>
                <h2 className='subtitle'>Dengue Diagnosis System.</h2>
            </div>
            <div className='home-body'>
                <button className='start-diagnosis-button' onClick={() => navigate("/chat-denguediag", { replace: true })}>
                    Start Diagnose
                </button>
            </div>
        </div>
    )
}