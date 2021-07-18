import {FC, useContext} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "../login/login";
import Main from "../main/main";

import './App.css';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";


const App: FC = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return <div className="content">
        <Router>
            <Route path="/" exact>{user ? <Redirect to="/main"/> : <Redirect to="/login"/>}</Route>
            <Route path="/login"><Login/></Route>
            <Route path="/main"><Main/></Route>
        </Router>
    </div>
};

export default App;
