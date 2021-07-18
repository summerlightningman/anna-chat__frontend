import {FC, useContext} from 'react';

import Chat from "./chat/chat";
import Header from "./header/header";

import './main.css';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Redirect} from "react-router-dom";

const Main: FC = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    if (!user)
        return <Redirect to="/login"/>

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