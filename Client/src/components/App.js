import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import AppBar from './AppBar';
import NotesContainer from './NotesContainer';
import NoteEditor from './NoteEditor';


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
            <Route exact path="/create">
                <NoteEditor></NoteEditor>
            </Route>
            <Route exact path="/note/:noteId" component={NoteEditor}/>
        </Router>
    );
}

export default App;
