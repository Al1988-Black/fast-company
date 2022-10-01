import React from "react";
import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfesions";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <div>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                    </Switch>
                    <ToastContainer />
                </QualityProvider>
            </ProfessionProvider>
        </div>
    );
}

export default App;
