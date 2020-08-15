import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NoteCard from './NoteCard';
import LoadingSpinner from './LoadingSpinner';
import apiService from 'services/apiService';
import AppBar from './AppBar';
import NoteEditor from './NoteEditor';

const NotesContainer = () => {
    const [dataFetched, setDataFetched] = useState(false);
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const [notesList, setNotesList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [editing, setEditing] = useState(false);
    const [editNoteId, setEditNoteId] = useState(null);

    useEffect(() => {
        apiService.getAllNotesAsync().then((notes) => {
            setNotesList(notes);
            setDataFetched(true);
        })
        .catch((failureReason) => {
            setDataFetchFailed(true);
        });   
    }, []);

    function setCreateNewNote(){
        setEditing(true);
        setEditNoteId(null);
    }

    function setEditExistingNote(noteId){
        setEditing(true);
        setEditNoteId(noteId);
    }

    function gotoAllNotes(){
        setEditing(false);
        setEditNoteId(null);
    }

    function onNewNoteCreated(newNote){
        // Update notes in state
        notesList.push(newNote);
        setNotesList(notesList);
        setEditExistingNote(newNote.id);
    }

    function onNoteDeleted(noteId){
        let updatedList = notesList.filter(element => element.id !== noteId);
        setNotesList(updatedList);
    }

    function onNoteModified(note){
        let updatedList = notesList;
        let indexOfModified = updatedList.findIndex(element => element.id === note.id);
        updatedList[indexOfModified] = note;
        setNotesList(updatedList);
    }

    function renderCards(notesList, searchString, setSearchString) {
        const containerStyle = {
            marginTop: '80px'
        }
        let lower = searchString.toLowerCase();
        let filtered = isEmpty(searchString) ? notesList : 
                        notesList.filter(note => note.title.toLowerCase().includes(lower) || note.content.toLowerCase().includes(lower));
        return (
            <>
            <AppBar setSearchString={setSearchString} createNewNote={setCreateNewNote}></AppBar>
            <div className="container-fluid" style={containerStyle}>
                <div className="card-columns pt-md-3 pt-lg-3 pt-sm-5">
                    {
                        filtered.map((element) => <NoteCard note={element} openNote = {() => setEditExistingNote(element.id)} key={element.id}></NoteCard>)
                    }
                </div>
            </div>
            </>)
    };

    function renderBarWithLoadingSpinner() {
        return (
            <>
            <AppBar setSearchString={setSearchString} createNewNote={setCreateNewNote}></AppBar>
            <LoadingSpinner/>
            </>
        )
    }

    function renderNoteEditor(){
        let noteToEdit = notesList.find(element => element.id === editNoteId);
        return <NoteEditor 
        note={noteToEdit} 
        backFunc={gotoAllNotes}
        onNewNoteCreated = {onNewNoteCreated}
        onNoteDeleted = {onNoteDeleted}
        onNoteModified = {onNoteModified}
        ></NoteEditor>
    }

    function renderContent (){
        if(editing){
            return renderNoteEditor();
        }

        if(dataFetched) {
            return renderCards(notesList, searchString, setSearchString);
        }
        else {
            return dataFetchFailed ? renderDataFetchErrorMessage() : renderBarWithLoadingSpinner();
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