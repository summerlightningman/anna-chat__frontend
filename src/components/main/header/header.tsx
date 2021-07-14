import {FC, MouseEventHandler, useEffect} from 'react';
import {userActionTypes} from "../../../types/user";
import {getProfile, logout} from "../../../http";

import './header.css';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Header: FC = () => {
    const dispatch = useDispatch();
    const {username} = useTypedSelector(state => state.user);

    useEffect(() => {
        getProfile().then(resp => {
            console.log(resp.data)
            dispatch({type: userActionTypes.SET_USERNAME, payload: resp.data.name});
            dispatch({type: userActionTypes.SET_ID, payload: resp.data.id});
        })
    }, [dispatch]);


    const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = () =>
        logout().then(() => window.location.href = '/login');

    return (
        <header className="main-header">
            <div className="main-header-item">{}</div>
            <div className="main-header-item">{}</div>
            <div className="main-header-item">
                <span className="main-header-nickname">{username}</span>
                <button className="main-header-button logout-button" onClick={handleLogoutClick}>Выход</button>
            </div>
        </header>
    );
};

export default Header;