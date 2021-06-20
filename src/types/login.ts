export enum loginActionTypes {
    SET_LOGIN = 'SET_LOGIN',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_ERROR = 'SET_ERROR'
}

export interface LoginState {
    login: string,
    password: string,
    error: string
}

interface SetLoginAction {
    type: loginActionTypes.SET_LOGIN,
    payload: string
}

interface SetPasswordAction {
    type: loginActionTypes.SET_PASSWORD,
    payload: string
}

interface SetErrorAction {
    type: loginActionTypes.SET_ERROR,
    payload: string
}

export type LoginAction = SetLoginAction | SetPasswordAction | SetErrorAction