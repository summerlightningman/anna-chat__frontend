import {UserMap} from "./user";
import {Room} from "./room";
import {MessageFromBackend} from "./message";

export enum chatActionTypes {
    SET_USER_LIST = 'SET_USER_LIST',
    SET_ROOM_LIST = 'SET_ROOM_LIST',
    SET_MESSAGE_LIST = 'SET_MESSAGE_LIST',
    SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT',
    ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
}

export interface ChatState {
    userList: UserMap,
    roomList: Room[],
    messageList: MessageFromBackend[],
    messageText: string
}

interface SetUserListAction {
    type: chatActionTypes.SET_USER_LIST,
    payload: UserMap
}

interface SetRoomListAction {
    type: chatActionTypes.SET_ROOM_LIST,
    payload: Room[]
}

interface SetMessageListAction {
    type: chatActionTypes.SET_MESSAGE_LIST,
    payload: MessageFromBackend[]
}

interface SetMessageText {
    type: chatActionTypes.SET_MESSAGE_TEXT,
    payload: string
}

interface AddNewMessage {
    type: chatActionTypes.ADD_NEW_MESSAGE,
    payload: MessageFromBackend
}

export type ChatAction = SetUserListAction | SetRoomListAction | SetMessageListAction | SetMessageText | AddNewMessage