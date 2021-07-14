import {ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';
import {MessageFromBackend, SendMessageForm, SendMessageType} from "../../../types/message";
import Message from "../message/message";
import {User} from "../../../types/user";
import {chat} from "../../../http";
import {ReceiveMessageType, SocketMessage} from "../../../types/socket";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {chatActionTypes} from "../../../types/chat";

const Chat: FC = () => {
    const loc = useLocation();

    const {messageText, userList, messageList} = useTypedSelector(state => state.chat);
    const dispatch = useDispatch();

    const [, , roomId] = loc.pathname.split('/');

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const sockRef = useRef<WebSocket>();

    const sendMessage = (body: SendMessageForm) => sockRef.current?.readyState === 1
        && sockRef.current?.send(JSON.stringify(body));


    window.onbeforeunload = () => {
        sendMessage({type: SendMessageType.LEAVE_ROOM});
        sockRef.current?.close();
    };

    useEffect(() => {
        sockRef.current = chat(roomId);
        sockRef.current.onmessage = (e: MessageEvent) => {
            const msg: SocketMessage = JSON.parse(e.data);
            switch (msg.type) {
                case ReceiveMessageType.START:
                    dispatch({type: chatActionTypes.SET_MESSAGE_LIST, payload: msg.messageList})
                    const users: Array<[number, string]> = msg.userList.map((user: User) => [user.id, user.name]);
                    dispatch({type: chatActionTypes.SET_USER_LIST, payload: new Map(users)});
                    if (messageContainerRef.current)
                        messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
                    break;
                case ReceiveMessageType.NEW_TEXT_MESSAGE:
                    const newMessage: MessageFromBackend = msg.message;
                    dispatch({type: chatActionTypes.ADD_NEW_MESSAGE, payload: newMessage})
                    if (messageContainerRef.current)
                        messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
                    break;
            }
        };
        sockRef.current.onopen = () => sendMessage({type: SendMessageType.JOIN_ROOM});

        return () => {
            sendMessage({type: SendMessageType.LEAVE_ROOM});
            sockRef.current?.close();
        }
    }, [dispatch, roomId]);

    const handleInput: ChangeEventHandler<HTMLInputElement> = e =>
        dispatch({type: chatActionTypes.SET_MESSAGE_TEXT, payload: e.target.value});
    const handleReturnPress: KeyboardEventHandler<HTMLInputElement> = e => e.key === 'Enter' && handleSubmit();
    const handleSubmit = () => {
        const added = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const newMessage: SendMessageForm = {
            type: SendMessageType.SEND_TEXT_MESSAGE,
            text: messageText,
            added
        };
        sendMessage(newMessage);
        dispatch({type: chatActionTypes.SET_MESSAGE_TEXT, payload: ''});
    };

    return (
        <div className="chat">
            <div className="message-list" ref={messageContainerRef}>
                {!roomId && <h1>Выберите комнату для чата</h1>}
                {messageList.map((message: MessageFromBackend) =>
                    <Message message={message} userName={userList.get(message.userId) || ''} key={message.id}/>)}
            </div>
            <div className="input-container">
                <input className="message-input" type="text" value={messageText} onInput={handleInput}
                       onKeyPress={handleReturnPress} placeholder="Текст сообщения..."/>
                <button className="btn-send" onClick={handleSubmit}>→</button>
            </div>
        </div>
    );
};

export default Chat;