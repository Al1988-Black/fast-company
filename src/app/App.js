import React from "react";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";
import NavBar from "./components/navBar";
import User from "./components/user";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={User} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
