import React from 'react';
import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NoteCard from './NoteCard';
import LoadingSpinner from './LoadingSpinner';
import apiService from 'services/apiService';
import AppBar from './AppBar';
import {ApiCacheContext} from 'providers/apiCacheProvider';

const NotesContainer = () => {
    const [searchString, setSearchString] = useState("");

    const apiCacheProvider = useContext(ApiCacheContext);

    useEffect(() => {
        apiService.getAllNotesAsync().then((notes) => {
            apiCacheProvider.setNotesList(notes);
            apiCacheProvider.setDataFetched(true);
        })
        .catch((failureReason) => {
            apiCacheProvider.setDataFetchFailed(true);
        });   
    }, []);

    function renderCards(notesList, searchString, setSearchString) {
        let lower = searchString.toLowerCase();
        let filtered = isEmpty(searchString) ? notesList : 
                        notesList.filter(note => note.title.toLowerCase().includes(lower) || note.content.toLowerCase().includes(lower));
        return (
            <>
            <AppBar setSearchString={setSearchString}></AppBar>
            <div className="container-fluid" style={{marginTop: '80px'}}>
                <div className="card-columns pt-md-3 pt-lg-3 pt-sm-5">
                    {
                        filtered.map((element) => <NoteCard note={element} key={element.id}></NoteCard>)
                    }
                </div>
            </div>
            </>)
    };

    function renderBarWithLoadingSpinner() {
        return (
            <>
            <AppBar setSearchString={setSearchString}></AppBar>
            <LoadingSpinner/>
            </>
        )
    }

    function renderContent (){
        if(apiCacheProvider.dataFetched) {
            return renderCards(apiCacheProvider.notesList, searchString, setSearchString);
        }
        else {
            return apiCacheProvider.dataFetchFailed ? renderDataFetchErrorMessage() : renderBarWithLoadingSpinner();
        }
    }

    return renderContent();
};

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function renderDataFetchErrorMessage() {
    return (
        <h4>Oops! Failed to fetch data from server, try again later</h4>
    )
}

export default NotesContainer;