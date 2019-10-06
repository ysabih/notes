import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import './App.css';
import AppBar from './AppBar';
import NotesContainer from './NotesContainer';


function App() {
    const containerStyle = {
        marginTop: '80px'
    }
    return (
        <Router>
            <Route exact path="/">
                <AppBar></AppBar>
                <div className="container-fluid" style={containerStyle}>
                    <NotesContainer></NotesContainer>
                </div>
            </Route>
            <Route path="/create">
                
            </Route>
        </Router>
    );
}

export default App;
