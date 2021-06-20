import {UserAction, userActionTypes, UserState} from "../../types/user";


const initialState: UserState = {
    id: 0,
    username: '',
};


export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case userActionTypes.SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return initialState
    }
};

