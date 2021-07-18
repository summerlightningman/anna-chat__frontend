import {FC, useContext} from "react";
import {useHistory} from "react-router-dom";

import {Context} from "../../index";
import {whiteList} from "../../whitelist";
import firebase from "firebase";

import "./login.css";

const Login: FC = () => {
    const {auth} = useContext(Context);
    const history = useHistory()

    const handleClick = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(({user}) =>
            user && whiteList.includes(user.uid) && history.push('/main/'));
    }

    return (
        <div className="login">
            <h1 className="page-header">Вход</h1>
            <div className="login-content">
                <button className="form-submit" onClick={handleClick}>Войти с помощью Google</button>
            </div>
        </div>
    );
};

export default Login;