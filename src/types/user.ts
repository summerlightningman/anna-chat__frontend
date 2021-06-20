export enum userActionTypes {
    SET_USER_DATA = 'SET_USER_DATA'
}

export interface UserState {
    id: number,
    username: string,
}

interface SetUserDataAction {
    type: userActionTypes.SET_USER_DATA,
    payload: UserState
}

export type UserAction = SetUserDataAction;