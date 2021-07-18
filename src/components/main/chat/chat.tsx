import {ChangeEventHandler, FC, KeyboardEventHandler, useContext, useState} from 'react';

import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../../../index";

import {TextMessage} from "../../../types/message";
import Message from "../message/message";
import './chat.css';

const Chat: FC = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [messageText, setMessageText] = useState<string>('');
    const [messageList, loading] = useCollectionData(
        firestore.collection('messages').orderBy('added')
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => setMessageText(e.target.value);

    const sendMessage = async () => {
        const newMessage: TextMessage = {
            userID: user?.uid,
            text: messageText,
            added: firebase.firestore.FieldValue.serverTimestamp(),
            userName: user?.displayName,
            photoURL: user?.photoURL,
        };
        await firestore.collection('messages').add(newMessage);
        setMessageText('');
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async e => e.key === 'Enter' && await sendMessage();
    // @ts-ignore
    const messages = messageList?.map(message => <Message message={message}/>)

    return (
        <div className="chat">
            <div className="message-list">
                {messages}
            </div>
            <div className="input-container">
                <input
                    className="message-input"
                    onChange={handleChange}
                    type="text"
                    placeholder="Текст сообщения..."
                    onKeyPress={handleKeyPress}
                    value={messageText}
                />
                <button className="btn-send" onClick={sendMessage}>→</button>
            </div>
        </div>
    );
};

export default Chat;