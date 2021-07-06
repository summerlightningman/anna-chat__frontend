import {FC} from 'react';
import {useLocation} from 'react-router-dom';

import './chat.css';

const Chat: FC = () => {
    const loc = useLocation();
    const [,,userId] = loc.pathname.split('/');

    return (
        <div className="chat">
            <h1>Вы ведёте диалог с пользователем #{userId}</h1>
        </div>
    );
};

export default Chat;