import React from 'react';
import './App.css';
import AppBar from './AppBar';
import NotesContainer from './NotesContainer';


function App() {
    const containerStyle = {
        marginTop: '80px'
    }
    return (
        <>
            <AppBar></AppBar>
            <div className="container-fluid" style={containerStyle}>
                <NotesContainer></NotesContainer>
            </div>
        </>
    );
}

export default App;
