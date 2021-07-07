import {FC, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';
import {chat} from "../../../http";

const Chat: FC = () => {
    const loc = useLocation();
    const [,,roomId] = loc.pathname.split('/');

    useEffect(() => {
        const sock: WebSocket = chat(roomId);
        sock.onmessage = e => console.log(e.data)
    }, [roomId])

    const text = roomId ? `Чат комнаты #${roomId}` : 'Выберите комнату для чата';

    return (
        <div className="chat">
            <h1>{text}</h1>
        </div>
    );
};

export default Chat;