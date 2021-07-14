import {ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';
import {MessageFromBackend, SendMessageForm, SendMessageType} from "../../../types/message";
import Message from "../message/message";
import {User, UserMap} from "../../../types/user";
import {chat} from "../../../http";
import {ReceiveMessageType, SocketMessage} from "../../../types/socket";

const Chat: FC = () => {
    const loc = useLocation();

    const [, , roomId] = loc.pathname.split('/');
    const [messageList, setMessageList] = useState<MessageFromBackend[]>([]);
    const [userList, setUserList] = useState<UserMap>(new Map());
    const [textMessage, setTextMessage] = useState<string>('');
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const sockRef = useRef<WebSocket>();

    const sendMessage = (body: SendMessageForm) => sockRef.current?.readyState === 1
        && sockRef.current?.send(JSON.stringify(body));

    const handleMessage = (e: MessageEvent) => {
        const msg: SocketMessage = JSON.parse(e.data);
        console.log(msg);
        switch (msg.type) {
            case ReceiveMessageType.START:
                setMessageList(msg.messageList);
                const users: Array<[number, string]> = msg.userList.map((user: User) => [user.id, user.name]);
                setUserList(new Map(users));
                if (messageContainerRef.current)
                    messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
                break;
            case ReceiveMessageType.NEW_TEXT_MESSAGE:
                const newMessage: MessageFromBackend = msg.message;
                setMessageList(msgList => [...msgList, newMessage]);
                if (messageContainerRef.current)
                    messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
        }
    };

    useEffect(() => {
        if (!roomId) return () => {
        }
        sockRef.current = chat(roomId);
        sockRef.current.onmessage = handleMessage;
        sockRef.current.onopen = () => sendMessage({type: SendMessageType.JOIN_ROOM});

        return () => {
            sendMessage({type: SendMessageType.LEAVE_ROOM});
            sockRef.current?.close();
        }
    }, [roomId]);

    const handleInput: ChangeEventHandler<HTMLInputElement> = e => setTextMessage(e.target.value);
    const handleReturnPress: KeyboardEventHandler<HTMLInputElement> = e => e.key === 'Enter' && handleSubmit();
    const handleSubmit = () => {
        const added = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const newMessage: SendMessageForm = {
            type: SendMessageType.SEND_TEXT_MESSAGE,
            text: textMessage,
            added
        };
        sendMessage(newMessage);
        setTextMessage('');
    };

    return (
        <div className="chat">
            <div className="message-list" ref={messageContainerRef}>
                {!roomId && <h1>Выберите комнату для чата</h1>}
                {messageList.map((message: MessageFromBackend) =>
                    <Message message={message} userName={userList.get(message.userId) || ''} key={message.id}/>)}
            </div>
            <div className="input-container">
                <input className="message-input" type="text" value={textMessage} onInput={handleInput}
                       onKeyPress={handleReturnPress} placeholder="Текст сообщения..."/>
                <button className="btn-send" onClick={handleSubmit}>→</button>
            </div>
        </div>
    );
};

export default Chat;