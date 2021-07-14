import {UserAction, userActionTypes, UserState} from "../../types/user";


const initialState: UserState = {
    id: 0,
    username: '',
};


export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case userActionTypes.SET_ID:
            return {...state, id: action.payload}
        case userActionTypes.SET_USERNAME:
            return {...state, username: action.payload}
        default:
            return state
    }
};

