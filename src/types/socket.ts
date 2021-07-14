import {MessageFromBackend} from "./message";
import {User} from "./user";

export enum ReceiveMessageType {
    START = 'start',
    NEW_TEXT_MESSAGE = 'new_text_message'
}

interface ReceiveStart {
    type: ReceiveMessageType.START,
    messageList: MessageFromBackend[],
    userList: User[]
}

interface ReceiveNewMessage {
    type: ReceiveMessageType.NEW_TEXT_MESSAGE,
    message: MessageFromBackend
}

export type SocketMessage = ReceiveStart | ReceiveNewMessage