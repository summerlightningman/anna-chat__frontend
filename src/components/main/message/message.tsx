import {FC} from 'react';
import {MessageFromBackend} from "../../../types/message";
import {UserID} from "../../../types/user";

import './message.css';

interface MessageProps {
    message: MessageFromBackend,
    userId: UserID
}

const Message: FC<MessageProps> = ({message, userId}) => {
    return (
        <div className="message">
            <span>{message.name}</span>
            <sub>{message.added}</sub>
            <span>{message.text}</span>
            <hr/>
        </div>
    );
};

export default Message;

