import {User} from "./user";
import {Room} from "./room";

export enum chatActionTypes {
    SET_USER_LIST = 'SET_USER_LIST',
    SET_ROOM_LIST = 'SET_ROOM_LIST'
}

export interface ChatState {
    userList: User[],
    roomList: Room[]
}

interface SetUserListAction {
    type: chatActionTypes.SET_USER_LIST,
    payload: User[]
}

interface SetRoomListAction {
    type: chatActionTypes.SET_ROOM_LIST,
    payload: Room[]
}

export type ChatAction = SetUserListAction | SetRoomListAction