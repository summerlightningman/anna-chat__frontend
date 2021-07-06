import {FC} from 'react';
import {User} from "../../../../../types/user";

import './user-list-item.css';

interface UserListItemProps {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({user}) => {
    return (
        <li className="user-list-item">
            <span>{user.name}</span>
        </li>
    );
};

export default UserListItem;