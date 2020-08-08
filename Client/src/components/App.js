import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import NoteEditor from './NoteEditor';
import {AuthProvider} from '../providers/authProvider'
import {PrivateRoute} from './auth/PrivateRoute';
import {Callback} from './auth/Callback';
import {Public} from './Public'
import Home from './Home';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact={true} path="/signin-callback" component={Callback} />
                    
                    <PrivateRoute exact path="/notes" component={Home}/>

                    <PrivateRoute exact path="/create" component={NoteEditor} />
                    <PrivateRoute exact path="/note/:noteId" component={NoteEditor}/>
                    <Route path="/" component={Public} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
