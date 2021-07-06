import {FC} from 'react';
import {User} from "../../../../../types/user";

interface UserListItemProps {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({user}) => {
    return (
        <div>
            <h1>#{user.id} {user.name}</h1>
        </div>
    );
};

export default UserListItem;