import {FC} from 'react';

import './room-list-item.css';
import {useLocation} from "react-router-dom";
import {Room} from "../../../../types/room";

interface RoomListItemProps {
    room: Room
}

const RoomListItem: FC<RoomListItemProps> = ({room}) => {
    const loc = useLocation();
    const [, , routeRoomId] = loc.pathname.split('/');

    const isActive = +routeRoomId === room.id;
    const className = isActive ? 'room-list-item room-list-item-active' : 'room-list-item'

    return (
        <li className={className}>
            <span>{room.name}</span>
        </li>
    );
};

export default RoomListItem;