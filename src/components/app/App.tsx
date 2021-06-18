import {FC} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "../login/login";
import Chat from "../chat/chat";

import './App.css';

const App: FC = () => (
    <div className="content">
        <Router>
            <Route path="/login"><Login/></Route>
            <Route path="/main"><Chat/></Route>
        </Router>
    </div>
);

export default App;
