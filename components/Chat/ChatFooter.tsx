import { Fragment, ReactNode } from 'react';
import './style.css'

interface props {
    component: Array<ReactNode>;
}

export default function ChatFooter({ component = [<></>] }: props) {
    return (
        <div className='chat-footer'>
            <h4>Choose your answer here:</h4>
            <div className='inner'>
                {component.map((C, index) => {
                    return (
                        <Fragment key={index}>
                            {C}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}