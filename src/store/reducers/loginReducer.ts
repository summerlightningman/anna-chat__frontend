import {LoginAction, loginActionTypes, LoginState} from "../../types/login";

const initialState: LoginState = {
    login: '',
    password: '',
    error: '',
    isLoggedIn: false
};

export const loginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case loginActionTypes.SET_LOGIN:
            return {...state, error: '', login: action.payload}
        case loginActionTypes.SET_PASSWORD:
            return {...state, error: '', password: action.payload}
        case loginActionTypes.SET_ERROR:
            return {...state, error: action.payload}
        case loginActionTypes.SET_IS_LOGGED_IN:
            return {...state, error: '', isLoggedIn: action.payload}
        default:
            return state
    }
}