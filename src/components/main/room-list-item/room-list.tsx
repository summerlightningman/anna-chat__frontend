import {FC, useMemo, useState} from "react";
import {Link} from "react-router-dom";

import './room-list.css';

import RoomListItem from "./room-list-item/room-list-item";
import {getRoomList} from "../../../http";
import {Room} from "../../../types/room";

const RoomList: FC = () => {
    const [roomList, setRoomList] = useState<Room[]>([]);

    useMemo(getRoomList, []).then(({data}) => setRoomList(data.roomList));

    return <div className="user-list-container">
        <ul className="user-list">
            {roomList.map((room: Room) =>
                <Link to={'/main/' + room.id.toString()} key={room.id}>
                    <RoomListItem room={room}/>
                </Link>
            )}
        </ul>
    </div>
}

export default RoomList;