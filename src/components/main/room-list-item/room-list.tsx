import {FC, useEffect} from "react";
import {Link} from "react-router-dom";

import './room-list.css';

import RoomListItem from "./room-list-item/room-list-item";
import {getRoomList} from "../../../http";
import {Room} from "../../../types/room";
import {useDispatch} from "react-redux";
import {chatActionTypes} from "../../../types/chat";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const RoomList: FC = () => {
    const dispatch = useDispatch();
    const {roomList} = useTypedSelector(state => state.chat);

    useEffect(() => {
        getRoomList().then(({data}) => dispatch({type: chatActionTypes.SET_ROOM_LIST, payload: data.roomList}));
    }, [dispatch]);

    console.log(roomList);

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