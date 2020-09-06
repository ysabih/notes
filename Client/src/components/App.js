import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from '../providers/authProvider';
import {PrivateRoute} from './auth/PrivateRoute';
import {Callback} from './auth/Callback';
import {Logout} from './auth/Logout';
import {LogoutCallback} from './auth/LogoutCallback';
import {Public} from './Public';
import { SilentRenew } from './auth/SilentRenew';
import NotesContainer from './NotesContainer';

function App() {
    return (
        <AuthProvider>
            <Router basename={process.env.REACT_APP_BASE_NAME}>
                <Switch>
                    <Route exact={true} path="/signin-callback" component={Callback} />
                    <Route exact={true} path="/silent-renew-callback" component={SilentRenew} />
                    <Route exact={true} path="/logout" component={Logout} />
                    <Route exact={true} path="/logout-callback" component={LogoutCallback} />
                    
                    <PrivateRoute exact path="/notes" component={NotesContainer}/>
                    <Route path="/" component={Public} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
