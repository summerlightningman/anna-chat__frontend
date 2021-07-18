import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import 'firebase/firestore';
import 'firebase/auth';

import './index.css';
import App from './components/app/App';

import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyAWTbnk3aWS3RD1RSPSny0eMlnPUfRDkFU",
    authDomain: "anna-chat-543f0.firebaseapp.com",
    projectId: "anna-chat-543f0",
    storageBucket: "anna-chat-543f0.appspot.com",
    messagingSenderId: "517192785682",
    appId: "1:517192785682:web:e253d3972fa398a85dddcb"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

interface FirebaseContext {
    auth: firebase.auth.Auth,
    firestore: firebase.firestore.Firestore
}

const contextValue = {auth, firestore}
export const Context = createContext<FirebaseContext>(contextValue);

ReactDOM.render(
    <Context.Provider value={contextValue}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

