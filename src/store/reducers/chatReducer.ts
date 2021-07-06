import {ChatAction, chatActionTypes, ChatState} from "../../types/chat";

const initialState: ChatState = {
    userList: []
}

export const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case chatActionTypes.SET_USER_LIST:
            return {...state, userList: action.payload}
        default:
            return state
    }
}