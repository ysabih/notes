import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"
import { AuthenticationProvider, oidcLog, InMemoryWebStorage, OidcSecure, withOidcSecure } from '@axa-fr/react-oidc-context';
import oidcConfiguration from '../utils/oidcConfig'
import './App.css';
import AppBar from './AppBar';
import NotesContainer from './NotesContainer';
import NoteEditor from './NoteEditor';


function App() {
    const containerStyle = {
        marginTop: '80px'
    }
    return (
        <AuthenticationProvider configuration={oidcConfiguration} loggerLevel={oidcLog.INFO} UserStore={InMemoryWebStorage}>
            <Router>
                <Route exact path="/">
                    <AppBar></AppBar>
                    <div className="container-fluid" style={containerStyle}>
                        <OidcSecure><NotesContainer></NotesContainer></OidcSecure>
                    </div>
                </Route>
                <Route exact path="/create">
                    <OidcSecure>
                        <NoteEditor></NoteEditor>
                    </OidcSecure>
                </Route>
                <Route exact path="/note/:noteId" component={withOidcSecure(NoteEditor)}/>
            </Router>
        </AuthenticationProvider>
    );
}

export default App;
