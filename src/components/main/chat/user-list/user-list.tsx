import {FC} from "react";

import './user-list.css';
import {getUserList} from "../../../../http";
import {User} from "../../../../types/user";

const UserList: FC = () => {


    getUserList().then(({data}) => {
        const userList: User[] = data.userList;

    });

    return <div className="user-list">
        <h1>UserList</h1>
    </div>
}

export default UserList;