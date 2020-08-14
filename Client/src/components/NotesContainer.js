import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NoteCard from './NoteCard';
import LoadingSpinner from './LoadingSpinner';
import apiService from 'services/apiService';

const NotesContainer = (props) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        apiService.getAllNotesAsync().then((notes) => {
            setNotesList(notes);
            setDataFetched(true);
        })
        .catch((failureReason) => {
            setDataFetchFailed(true);
        });   
    }, []);

    return dataFetched ? renderCards(notesList, props.searchString) : (dataFetchFailed ? renderDataFetchErrorMessage() : renderLoadingSpinner());
};

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function renderCards(notesList, searchString) {
    let lower = searchString.toLowerCase();
    let filtered = isEmpty(searchString) ? notesList : 
                    notesList.filter(note => note.title.toLowerCase().includes(lower) || note.content.toLowerCase().includes(lower));
    return (
        <div className="card-columns pt-md-3 pt-lg-3 pt-sm-5">
            {
                filtered.map((element) => <NoteCard note={element} key={element.id}></NoteCard>)
            }
        </div>)
};

function renderLoadingSpinner() {
    return (
        <LoadingSpinner/>
    )
}

function renderDataFetchErrorMessage() {
    return (
        <h4>Oops! Failed to fetch data from server, try again later</h4>
    )
}

export default NotesContainer;