import {FC} from 'react';
import {MessageFromBackend} from "../../../types/message";
import {UserName} from "../../../types/user";

import './message.css';

interface MessageProps {
    message: MessageFromBackend,
    userName: UserName
}

const Message: FC<MessageProps> = ({message, userName}) => {
    return (
        <div className="message">
            <span className="message-name">{userName}</span>
            <sub className="message-added">{message.added}</sub>
            <p className="message-text">{message.text}</p>
        </div>
    );
};

export default Message;

