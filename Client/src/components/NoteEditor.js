import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './NoteEditor.css'
import LoadingSpinner from './LoadingSpinner'

const NoteEditor = (props) => {
    const [contentFetchFailed, setContentFetchFailed] = useState(false);
    const [noteNotFound, setNoteNotFound] = useState(false);
    const [runningBlockingOperation, setRunningBlockingOperation] = useState(false);

    const [noteId, setNoteId] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const history = useHistory();

    let routeNoteId = null;
    if(props.match !== undefined){
        routeNoteId = props.match.params.noteId;
    }

    useEffect(() => {
        if(routeNoteId != null){
            setRunningBlockingOperation(true);
            fetch(`/api/notes/${routeNoteId}`)
            .then((response) => {
                if(response.status === 404){
                    setNoteNotFound(true);
                    return;
                }
                response.json().then((json)=> {
                    console.log("Note content recevied: "+JSON.stringify(json, null, 2));
                    setNoteInState(json);
                })
            }, (failureReason) => {
                setContentFetchFailed(true);
            }).finally(() => setRunningBlockingOperation(false));
        }
    }, []);

    function renderNoteContentForm(){
        return (
        <div className="container-fluid mt-1">
            <div className="container-fluid mb-2 pl-0">
                <div className="row align-items-center">
                    <Link className="btn btn-link btn-lg" to="/">
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Link>
                    <button className="btn btn-primary btn-xs ml-auto px-3" onClick={() => saveOrCreateNote()} disabled={runningBlockingOperation}>
                        Save
                    </button>
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
                    className="form-control form-group" rows="25" 
                    placeholder= {runningBlockingOperation ? "" : "Note something..." }
                    disabled = {runningBlockingOperation}
                    value={noteContent} 
                    onChange={(event) => setNoteContent(event.target.value)}
                />
            </div>
        </div>);
    }

    function renderNotFound(){
        return (
            <h5>NotFound 404</h5>
        );
    }
    
    function renderContentFetchFailed(){
        return (
            <h5>Oops! Server error. Try again later</h5>
        );
    }

    function renderContent(){
        if(!contentFetchFailed && !noteNotFound){
            return renderNoteContentForm();
        }
        if(noteNotFound){
            return renderNotFound();
        }
        if(contentFetchFailed){
            return renderContentFetchFailed();
        }
    }

    async function saveOrCreateNote() {
        try{
            setRunningBlockingOperation(true);
            let body = JSON.stringify(getNoteInState());
            let response = null;
            if(noteId != null){
                let url = `/api/notes/${noteId}`;
                response = await fetch(url, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: body});
            }
            else{
                let url = `/api/notes`;
                response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body});

                let responseJson = await response.json();
                console.log("Note created: "+JSON.stringify(responseJson, null, 2));
                setNoteInState(responseJson);
                history.push(`/note/${responseJson.id}`);
            }
            if(response.status !== 200){
                // TODO: Handle server errors
            }
        }
        finally{
            setRunningBlockingOperation(false);
        }
    }
    
    function setNoteInState(note) {
        setNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    }

    function getNoteInState() {
        return {
            title: noteTitle,
            content: noteContent
        }
    }

    return renderContent();

};



export default NoteEditor;