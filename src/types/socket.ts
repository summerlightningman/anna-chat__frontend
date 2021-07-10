import {MessageFromBackend} from "./message";
import {User} from "./user";

export enum ReceiveMessageType {
    MESSAGE_LIST = 'message_list',
    ONLINE_USER_LIST = 'online_user_list',
    NEW_MESSAGE = 'new_message'
}

interface ReceiveMessageList {
    type: ReceiveMessageType.MESSAGE_LIST,
    messageList: MessageFromBackend[]
}

interface ReceiveOnlineUserList {
    type: ReceiveMessageType.ONLINE_USER_LIST,
    userList: User[]
}

interface ReceiveNewMessage {
    type: ReceiveMessageType.NEW_MESSAGE,
    message: MessageFromBackend
}

export type SocketData = ReceiveMessageList | ReceiveOnlineUserList | ReceiveNewMessage