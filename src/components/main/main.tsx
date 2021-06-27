import {FC} from 'react';
import {getProfile} from "../../http";
import {useDispatch} from "react-redux";
import {userActionTypes} from "../../types/user";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

import './main.css';

const Main: FC = () => {
    const dispatch = useDispatch();
    const {id, username} = useTypedSelector(state => state.user);
    const [cookies, ,] = useCookies(['token']);

    if (!('token' in cookies))
        return <Redirect to="/login"/>

    if (!id)
        getProfile().then(({data}) => {
            dispatch({type: userActionTypes.SET_ID, payload: data.id});
            dispatch({type: userActionTypes.SET_USERNAME, payload: data.username})
        });


    return (
        <div className="chat">
            <header className="chat-header">
                <div className="chat-header-item">{username}
                    <button>Выход</button>
                </div>
            </header>
        </div>
    );
};

export default Main;