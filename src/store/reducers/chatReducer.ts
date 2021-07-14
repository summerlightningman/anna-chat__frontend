import {ChatAction, chatActionTypes, ChatState} from "../../types/chat";

const initialState: ChatState = {
    userList: new Map(),
    roomList: [],
    messageList: [],
    messageText: ''
}

export const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case chatActionTypes.SET_USER_LIST:
            return {...state, userList: action.payload}
        case chatActionTypes.SET_ROOM_LIST:
            return {...state, roomList: action.payload}
        case chatActionTypes.SET_MESSAGE_LIST:
            return {...state, messageList: action.payload}
        case chatActionTypes.ADD_NEW_MESSAGE:
            return {...state, messageList: [...state.messageList, action.payload]}
        case chatActionTypes.SET_MESSAGE_TEXT:
            return {...state, messageText: action.payload}
        default:
            return state
    }
}