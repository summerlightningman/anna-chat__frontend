export enum loginActionTypes {
    SET_LOGIN = 'SET_LOGIN',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_ERROR = 'SET_ERROR',
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
    RESET_ALL_FIELDS = 'RESET_ALL_FIELDS'
}

export interface LoginState {
    login: string,
    password: string,
    error: string,
    isLoggedIn: boolean
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

interface SetIsLoggedInAction {
    type: loginActionTypes.SET_IS_LOGGED_IN,
    payload: boolean
}

interface ResetAllFields {
    type: loginActionTypes.RESET_ALL_FIELDS
}

export type LoginAction = SetLoginAction | SetPasswordAction | SetErrorAction | SetIsLoggedInAction | ResetAllFields