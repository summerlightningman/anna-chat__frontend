import {FC} from 'react';
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

import Chat from "./chat/chat";
import RoomList from "./room-list-item/room-list";
import Header from "./header/header";

import './main.css';

const Main: FC = () => {
    const [cookies, ,] = useCookies(['token']);

    if (!('token' in cookies))
        return <Redirect to="/login"/>

    return (
        <div className="chat-window">
            <Header/>
            <main className="chat-main">
                <RoomList/>
                <Chat/>
            </main>
        </div>
    );
};

export default Main;