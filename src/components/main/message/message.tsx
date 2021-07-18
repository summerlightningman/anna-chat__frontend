import {FC, useContext} from 'react';

import {TextMessage} from "../../../types/message";
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";

import './message.css';

interface MessageProps {
    message: TextMessage
}

const Message: FC<MessageProps> = ({message}) => {
    console.log(message);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    // @ts-ignore
    const added = message.added && message.added.toDate().toLocaleString();

    const className = 'message ' + (message.userID === user?.uid ? 'right' : 'left');
    // TypeScript заебал капризничать. Всё ему не то, блять...
    const avatar = message.photoURL ? <img className="avatar" src={message.photoURL} alt=""/> :
        <img className="avatar" alt=""/>;

    return (
        <div className={className}>
            {avatar}
            <div className="message-text-data">
                <div className="message-data">
                    <span className="message-name">{message.userName}</span>
                    <span className="message-added">{added}</span>
                </div>
                <span className="message-text">{message.text}</span>
            </div>
        </div>
    );
};

export default Message;

