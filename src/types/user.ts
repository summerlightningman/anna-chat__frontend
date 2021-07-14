export enum userActionTypes {
    SET_ID = 'SET_ID',
    SET_USERNAME = 'SET_USERNAME',
}

export type UserID = number;
export type UserName = string;

export interface User {
    id: UserID,
    name: UserName
}

export interface UserState {
    id: UserID,
    username: UserName,
}

interface SetIdAction {
    type: userActionTypes.SET_ID
    payload: UserID
}

interface SetUsernameAction {
    type: userActionTypes.SET_USERNAME
    payload: UserName
}

export type UserAction = SetIdAction | SetUsernameAction;
export type UserMap = Map<UserID, UserName>;