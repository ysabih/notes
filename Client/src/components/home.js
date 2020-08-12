import React from 'react';
import {useState} from 'react';
import AppBar from './AppBar';
import NotesContainer from './NotesContainer';

function Home() {

    const [searchString, setSearchString] = useState("");

    const containerStyle = {
        marginTop: '80px'
    }

    return (
        <>
        <AppBar setSearchString={setSearchString}></AppBar>
        <div className="container-fluid" style={containerStyle}>
            <NotesContainer searchString={searchString}></NotesContainer>
        </div>
        </>
    );
}

export default Home;