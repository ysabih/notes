import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import './NoteEditor.css'
import LoadingSpinner from './LoadingSpinner'
import apiService from 'services/apiService';
import { ApiCacheContext } from 'providers/apiCacheProvider'

// Expects note object to be passed as a prop
const NoteEditor = (props) => {
    const [runningBlockingOperation, setRunningBlockingOperation] = useState(false);

    const [noteId, setNoteId] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [originalNote, setOriginalNote] = useState(null);

    let { noteIdParam } = useParams();
    let apiCacheProvider = useContext(ApiCacheContext);
    let history = useHistory();

    useEffect(() => {
        if(noteIdParam != null && !props.newNote){
            let note = apiCacheProvider.notesList.find(n => n.id === noteIdParam);
            setNoteInState(note);
            setOriginalNote(note);
        }
    }, []);

    function renderContent(){
        return (
        <div className="container-fluid mt-1">
            <div className="container-fluid mb-2 pl-0">
                <div className="row align-items-center">
                    <Link to={'/notes'} className="btn btn-link btn-lg">
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Link>
                    <div className="row align-items-right ml-auto px-3">
                        {noteId ? <button className="btn btn-link" data-toggle="modal" data-target="#deleteModal">
                            <FontAwesomeIcon icon={faTrashAlt} color="red"></FontAwesomeIcon>
                        </button> : <></>}
                        <button className="btn btn-link ml-2" onClick={() => saveOrCreateNoteAsync()} disabled={runningBlockingOperation || !isNoteValid() || !isNoteModified()}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">NO</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteNoteAsync}>YES</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {runningBlockingOperation ? <LoadingSpinner /> : <></>}
                <input 
                    className="form-control form-control-lg form-group font-weight-bold" 
                    type="text" 
                    placeholder= {runningBlockingOperation ? "" : "Title"}
                    disabled = {runningBlockingOperation}
                    autoFocus value={noteTitle} 
                    onChange={(event) => {
                        setNoteTitle(event.target.value);
                    }} 
                />
                <textarea
                    className="form-control form-group" rows="100" 
                    placeholder= {runningBlockingOperation ? "" : "Note something..." }
                    disabled = {runningBlockingOperation}
                    value={noteContent} 
                    onChange={(event) => setNoteContent(event.target.value)}
                />
            </div>
        </div>);
    }

    async function saveOrCreateNoteAsync() {
        setRunningBlockingOperation(true);
        if(noteId != null){
            let note = getNoteInState();
            let modified = await apiService.modifyNoteAsync(note);
            onNoteModified(modified);
            setOriginalNote(modified);
        }
        else{
            let created = await apiService.createNoteAsync(getNoteInState()); 
            setNoteInState(created);
            onNewNoteCreated(created);
            setOriginalNote(created);
            
        }
        setRunningBlockingOperation(false);
    }

    async function deleteNoteAsync() {
        setRunningBlockingOperation(true);
        let success = await apiService.deleteNoteAsync(noteId);

        if(success){
            // Note was deleted with success, back to home page
            onNoteDeleted(noteId);
        }
    }

    function onNewNoteCreated(newNote){
        // Update notes in state
        let currentList = apiCacheProvider.notesList;
        currentList.push(newNote);
        apiCacheProvider.setNotesList(currentList);

        history.push(`/notes/${newNote.id}`);
    }

    function onNoteDeleted(noteId){
        let currentList = apiCacheProvider.notesList;
        let updatedList = currentList.filter(element => element.id !== noteId);
        apiCacheProvider.setNotesList(updatedList);

        history.push('/notes');
    }

    function onNoteModified(note){
        let currentList = apiCacheProvider.notesList;
        let indexOfModified = currentList.findIndex(element => element.id === note.id);
        currentList[indexOfModified] = note;
        apiCacheProvider.setNotesList(currentList);
    }
    
    function setNoteInState(note) {
        setNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    }

    function isNoteValid(){
        return noteTitle.length > 0;
    }

    function isNoteModified(){
        if(!originalNote) return true;
        return noteTitle !== originalNote.title || noteContent !== originalNote.content;
    }

    function getNoteInState() {
        let result =  {
            title: noteTitle,
            content: noteContent
        }
        if(noteId != null) result.id = noteId;
        return result;
    }
    return renderContent();
};

export default NoteEditor;