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
            return {...state, login: action.payload}
        case loginActionTypes.SET_PASSWORD:
            return {...state, password: action.payload}
        case loginActionTypes.SET_ERROR:
            return {...state, error: action.payload}
        case loginActionTypes.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload}
        default:
            return state
    }
}