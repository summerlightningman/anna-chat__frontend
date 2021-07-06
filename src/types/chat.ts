import {User} from "./user";

export enum chatActionTypes {
    SET_USER_LIST = 'SET_USER_LIST'
}

export interface ChatState {
    userList: User[]
}

interface SetUserListAction {
    type: chatActionTypes.SET_USER_LIST,
    payload: User[]
}

export type ChatAction = SetUserListAction