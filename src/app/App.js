import React from "react";
import Main from "./layout/main";
import Login from "./layout/login";
// import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import UserEditPage from "./components/page/userEditPage/userEditPage";
import { Route, Switch } from "react-router-dom";
import UserPage from "./components/page/userPage/userPage";
import UsersListPage from "./components/page/usersListPage/usersListPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route
                    path="/users/:userId/edit"
                    exact
                    component={UserEditPage}
                />
                <Route path="/users/:userId" component={UserPage} />

                <Route path="/users" component={UsersListPage} />
            </Switch>
        </div>
    );
}

export default App;
