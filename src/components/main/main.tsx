import {FC} from 'react';

import Chat from "./chat/chat";
import Header from "./header/header";

import './main.css';

const Main: FC = () => {
    return (
        <div className="chat-window">
            <Header/>
            <main className="chat-main">
                <Chat/>
            </main>
        </div>
    );
};

export default Main;