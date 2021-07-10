import {ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';
import {chat} from "../../../http";
import {MessageFromBackend, SendMessageForm, SendMessageType} from "../../../types/message";
import Message from "../message/message";
import {User, UserMap} from "../../../types/user";
import {ReceiveMessageType, SocketData} from "../../../types/socket";


let sock: WebSocket;

const Chat: FC = () => {
    const loc = useLocation();

    const [, , roomId] = loc.pathname.split('/');
    const [messageList, setMessageList] = useState<MessageFromBackend[]>([]);
    const [userList, setUserList] = useState<UserMap>(new Map());
    const [textMessage, setTextMessage] = useState<string>('');

    useEffect(() => {
        sock = chat(roomId);
        sock.onmessage = e => {
            const data: SocketData = JSON.parse(e.data);
            switch (data.type) {
                case ReceiveMessageType.MESSAGE_LIST:
                    setMessageList(data.messageList);
                    break;
                case ReceiveMessageType.ONLINE_USER_LIST:
                    const userMap: UserMap = new Map(data.userList.map((user: User) => [user.id, user.name]));
                    setUserList(userMap);
                    break;
            }

        };
        const message: SendMessageForm = {type: SendMessageType.JOIN_ROOM}
        sock.onopen = () => sock.send(JSON.stringify(message));
        return () => {
            const message: SendMessageForm = {type: SendMessageType.LEAVE_ROOM}
            sock.send(JSON.stringify(message));
            sock.close()
        }
    }, [roomId]);

    const handleInput: ChangeEventHandler<HTMLInputElement> = e => setTextMessage(e.target.value);
    const handleReturnPress: KeyboardEventHandler = e => e.key === 'Enter' && handleSubmit();
    const handleSubmit = () => {
        const added = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const newMessage: SendMessageForm = {
            type: SendMessageType.SEND_MESSAGE,
            text: textMessage,
            added
        };
        sock.send(JSON.stringify(newMessage));
    };

    return (
        <div className="chat">
            <div className="message-list">
                {!roomId && <h1>Выберите комнату для чата</h1>}
                {messageList.map((message: MessageFromBackend) =>
                    <Message message={message} userName={userList.get(message.userId) || ''} key={message.id}/>)}
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