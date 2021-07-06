import {FC} from 'react';
import {User} from "../../../../types/user";

import './user-list-item.css';
import {useLocation} from "react-router-dom";

interface UserListItemProps {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({user}) => {
    const loc = useLocation();
    const [, , routeUserId] = loc.pathname.split('/');

    const isActive = +routeUserId === user.id;
    const className = isActive ? 'user-list-item user-list-item-active' : 'user-list-item'

    return (
        <li className={className}>
            <span>{user.name}</span>
        </li>
    );
};

export default UserListItem;