import {ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';
import {chat} from "../../../http";
import {MessageFromBackend, SendMessageForm, SendMessageType, TextMessage} from "../../../types/message";
import Message from "../message/message";

interface SocketData {
    type: string,
    messageList: MessageFromBackend[]
}

const Chat: FC = () => {
    const loc = useLocation();
    const [, , roomId] = loc.pathname.split('/');
    const [messageList, setMessageList] = useState<MessageFromBackend[]>([]);
    const [textMessage, setTextMessage] = useState<string>('');

    const sock: WebSocket = chat(roomId);
    useEffect(() => {
        // const sock: WebSocket = chat(roomId);
        sock.onmessage = e => {
            const data: SocketData = JSON.parse(e.data);
            if (data.type === 'load_messages')
                setMessageList(data.messageList);
        };
        const message: SendMessageForm = {type: SendMessageType.JOIN_ROOM}
        sock.onopen = () => sock.send(JSON.stringify(message));
        return () => {
            const message: SendMessageForm = {type: SendMessageType.LEAVE_ROOM}
            sock.send(JSON.stringify(message));
            sock.close()
        }
    }, [sock])

    const handleInput: ChangeEventHandler<HTMLInputElement> = e => setTextMessage(e.target.value);
    const handleReturnPress: KeyboardEventHandler = e => e.key === 'Enter' && handleSubmit();
    const handleSubmit = () => {
        const added = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const newMessage: TextMessage = {
            text: textMessage,
            added
        };
        sock.send(JSON.stringify(newMessage))
    };

    return (
        <div className="chat">
            <div className="message-list">
                {!roomId && <h1>Выберите комнату для чата</h1>}
                {messageList.map((message: MessageFromBackend) => <Message message={message} userId={2}
                                                                           key={message.id}/>)}
            </div>
            <div className="input-container">
                <input className="message-input" type="text" value={textMessage} onInput={handleInput}
                       onKeyPress={handleReturnPress}/>
                <button className="btn-send" onClick={handleSubmit}>→</button>
            </div>
        </div>
    );
};

export default Chat;