import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NoteCard from './NoteCard';
import LoadingSpinner from './LoadingSpinner';
import {AuthContext} from '../providers/authProvider'

const NotesContainer = (props) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const [notesList, setNotesList] = useState([]);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.getUserAsync().then((user) => {
            let token = user.access_token;
            fetch("/api/notes", {method: "GET", headers: new Headers({'Authorization': 'Bearer ' + token})})
            .then((response) => {
                response.json().then(json => {
                    setNotesList(json);
                    setDataFetched(true);
                })
            },
            (failureReason) => {
                setDataFetchFailed(true);
            })});
    }, []);

    return dataFetched ? renderCards(notesList) : (dataFetchFailed ? renderDataFetchErrorMessage() : renderLoadingSpinner());
};

function renderCards(notesList) {
    return (
        <div className="card-columns pt-md-3 pt-lg-3 pt-sm-5">
            {
                notesList.map((element) => <NoteCard note={element} key={element.id}></NoteCard>)
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