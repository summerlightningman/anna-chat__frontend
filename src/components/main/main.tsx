import {Dispatch, FC, useMemo, useState} from 'react';
import {getProfile} from "../../http";
import {User} from "../../types/user";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

import './main.css';


const Main: FC = () => {
    const [currUserData, setCurrUserData] = useState<User | Dispatch<User>>({id: 0, name: ''});
    const [cookies, ,] = useCookies(['token']);

    useMemo(getProfile, []).then(resp => {
        const user: User = resp.data;
        setCurrUserData(user);
    });

    if (!('token' in cookies))
        return <Redirect to="/login"/>

    return (
        <div className="chat-window">
            <header className="chat-window-header">
                <div className="chat-window-header-item">{currUserData.name}
                    <button>Выход</button>
                </div>
            </header>
            <main>

            </main>
        </div>
    );
};

export default Main;