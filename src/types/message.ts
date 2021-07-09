import {UserName} from "./user";

type MessageID = number;
type DateTime = string;

export enum SendMessageType {
    LEAVE_ROOM = 'leave_room',
    JOIN_ROOM = 'join_room',
    TEXT_MESSAGE = 'text_message',
}

export interface TextMessage {
    text: string,
    added: DateTime
}

interface SendTextMessage extends TextMessage {
    type: SendMessageType.TEXT_MESSAGE,
}

interface JoinRoomMessage {
    type: SendMessageType.JOIN_ROOM
}

interface LeaveRoomMessage {
    type: SendMessageType.LEAVE_ROOM
}

export interface MessageFromBackend extends TextMessage {
    name: UserName
    id: MessageID,
}

export type SendMessageForm = SendTextMessage | JoinRoomMessage | LeaveRoomMessage;