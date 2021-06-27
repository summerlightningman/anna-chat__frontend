import {FC} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from "../login/login";
import Main from "../main/main";

import './App.css';
const App: FC = () => {

    return <div className="content">
        <Router>
            <Route path="/" exact><Redirect to="/login"/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/main"><Main/></Route>
        </Router>
    </div>
};

export default App;
