import {FC, useContext} from 'react';

import './header.css';

import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Header: FC = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const handleClick = () => auth.signOut();

    return (
        <header className="main-header">
            <div className="main-header-item">{}</div>
            <div className="main-header-item">{}</div>
            <div className="main-header-item">
                <span className="main-header-nickname">{user?.displayName}</span>
                <button className="main-header-button logout-button" onClick={handleClick}>Выход</button>
            </div>
        </header>
    );
};

export default Header;