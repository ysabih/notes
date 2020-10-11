import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from '../providers/authProvider';
import {ApiCacheProvider} from '../providers/apiCacheProvider';
import {PrivateRoute} from './auth/PrivateRoute';
import {Callback} from './auth/Callback';
import {Logout} from './auth/Logout';
import {LogoutCallback} from './auth/LogoutCallback';
import {Public} from './Public';
import { SilentRenew } from './auth/SilentRenew';
import NotesContainer from './NotesContainer';
import NoteEditor from './NoteEditor';

function App() {
    return (
        <AuthProvider>
        <ApiCacheProvider>
            <Router basename={process.env.REACT_APP_BASE_NAME}>
                <Switch>
                    <Route exact={true} path="/signin-callback" component={Callback} />
                    <Route exact={true} path="/silent-renew-callback" component={SilentRenew} />
                    <Route exact={true} path="/logout" component={Logout} />
                    <Route exact={true} path="/logout-callback" component={LogoutCallback} />
                    
                    <PrivateRoute exact path="/notes" component={NotesContainer}/>
                    <PrivateRoute exact path="/notes/:noteIdParam" component={NoteEditor}/>
                    <PrivateRoute exact path="/new" component={() => NoteEditor({newNote: true})}/>
                    <Route path="/" component={Public} />
                </Switch>
            </Router>
        </ApiCacheProvider>
        </AuthProvider>
    );
}

export default App;
