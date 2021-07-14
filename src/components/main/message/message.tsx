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
            <div className="message-data">
                <span className="message-name">{userName}</span>
                <span className="message-added">{message.added}</span></div>
            <span className="message-text">{message.text}</span>
        </div>
    );
};

export default Message;

