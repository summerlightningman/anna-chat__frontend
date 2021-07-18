import firebase from "firebase";

interface Timestamp {
    seconds: number,
    nanoseconds: number,
}

export interface TextMessage {
    text: string,
    added?: firebase.firestore.FieldValue | Timestamp | null,
    userID?: string | null,
    userName?: string | null,
    photoURL?: string | null,
}