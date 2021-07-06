import {Dispatch, FC, MouseEventHandler, useMemo, useState} from 'react';
import {User} from "../../../types/user";
import {getProfile, logout} from "../../../http";

import './header.css';

const Header: FC = () => {
    const [currUserData, setCurrUserData] = useState<User | Dispatch<User>>({id: 0, name: ''});

    useMemo(getProfile, []).then(resp => {
        const user: User = resp.data;
        setCurrUserData(user);
    });

    const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = () =>
        logout().then(() => window.location.href = '/login');

    return (
        <header className="main-header">
            <div className="main-header-item"></div>
            <div className="main-header-item"></div>
            <div className="main-header-item">{currUserData.name}
                <button onClick={handleLogoutClick}>Выход</button>
            </div>
        </header>
    );
};

export default Header;