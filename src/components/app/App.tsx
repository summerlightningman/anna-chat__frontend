import {FC} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from "../login/login";
import Chat from "../chat/chat";

import './App.css';
const App: FC = () => {

    return <div className="content">
        <Router>
            <Route path="/" exact><Redirect to="/login"/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/main"><Chat/></Route>
        </Router>
    </div>
};

export default App;
