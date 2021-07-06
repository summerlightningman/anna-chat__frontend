export enum userActionTypes {
    SET_ID = 'SET_ID',
    SET_USERNAME = 'SET_USERNAME',
}


export interface User {
    id: number,
    name: string
}

export interface UserState {
    id: number,
    username: string,
    userList: User[]
}

interface SetIdAction {
    type: userActionTypes.SET_ID
    payload: number
}

interface SetUsernameAction {
    type: userActionTypes.SET_USERNAME
    payload: string
}

export type UserAction = SetIdAction | SetUsernameAction;