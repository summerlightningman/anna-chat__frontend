import {FC, useMemo, useState} from "react";
import {Link} from "react-router-dom";

import './user-list.css';

import UserListItem from "./user-list-item/user-list-item";
import {getUserList} from "../../../../http";
import {User} from "../../../../types/user";

const UserList: FC = () => {
    const [userList, setUserList] = useState<User[]>([]);

    useMemo(getUserList, []).then(({data}) => setUserList(data.userList));

    return <div className="user-list-container">
        <ul className="user-list">
            {
                userList.map(
                    (user: User) =>
                        <Link to={'/main/' + user.id.toString()} key={user.id}>
                            <UserListItem user={user}/>
                        </Link>
                )
            }
        </ul>
    </div>
}

export default UserList;