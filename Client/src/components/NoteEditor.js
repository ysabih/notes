import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './NoteEditor.css'
import LoadingSpinner from './LoadingSpinner'

const NoteEditor = (props) => {
    const [contentFetchFailed, setContentFetchFailed] = useState(false);
    const [noteNotFound, setNoteNotFound] = useState(false);
    const [loadingNote, setLoadingNote] = useState(false);
    const [note, setNote] = useState({id: null, title: "", content: ""});

    let routeNoteId = null;
    if(props.match !== undefined){
        routeNoteId = props.match.params.noteId;
    }
    
    useEffect(() => {
        if(routeNoteId != null){
            setLoadingNote(true);
            fetch(`/api/notes/${routeNoteId}`)
            .then((response) => {
                if(response.status === 404){
                    setNoteNotFound(true);
                    return;
                }
                response.json().then((json)=> {
                    setNote(json);
                })
            }, (failureReason) => {
                setContentFetchFailed(true);
            }).finally(() => setLoadingNote(false));
        }
    }, []);

    function renderNoteContentForm(note){
        return (
        <div className="container-fluid mt-1">
            <div className="container-fluid mb-2 pl-0">
                <div className="row align-items-center">
                    <Link className="btn btn-link btn-lg" to="/">
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Link>
                    <button className="btn btn-primary btn-xs ml-auto px-3">
                        Save
                    </button>
                </div>
            </div>
            <div>
                {loadingNote ? <LoadingSpinner /> : <></>}
                <input 
                    className="form-control form-control-lg form-group font-weight-bold" 
                    type="text" 
                    placeholder= {loadingNote ? "" : "Title"}
                    disabled = {loadingNote}
                    autoFocus value={note.title} 
                    onChange={(event) => setNote({ title: event.target.value })} 
                />
                <textarea
                    className="form-control form-group" rows="25" 
                    placeholder= {loadingNote ? "" : "Note something..." }
                    disabled = {loadingNote}
                    value={note.content} 
                    onChange={(event) => setNote({ content: event.target.value })}
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
            return renderNoteContentForm(note);
        }
        if(noteNotFound){
            return renderNotFound();
        }
        if(contentFetchFailed){
            return renderContentFetchFailed();
        }
    }

    return renderContent();

};



export default NoteEditor;