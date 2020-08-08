import React, { useContext, useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import './NoteEditor.css'
import LoadingSpinner from './LoadingSpinner'
import { AuthContext } from 'providers/authProvider'

const NoteEditor = (props) => {
    const [contentFetchFailed, setContentFetchFailed] = useState(false);
    const [noteNotFound, setNoteNotFound] = useState(false);
    const [runningBlockingOperation, setRunningBlockingOperation] = useState(false);

    const [noteId, setNoteId] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const history = useHistory();
    const authContext = useContext(AuthContext);

    let routeNoteId = null;
    if(props.match !== undefined){
        routeNoteId = props.match.params.noteId;
    }

    useEffect(() => {
        if(routeNoteId != null){
            setRunningBlockingOperation(true);
            authContext.getUserAsync().then((user) => {
                let token = user.access_token;
                fetch(`/api/notes/${routeNoteId}`, {method: "GET", headers: new Headers({'Authorization': 'Bearer ' + token})})
                .then((response) => {
                    if(response.status === 404){
                        setNoteNotFound(true);
                        return;
                    }
                    response.json().then((json)=> {
                        setNoteInState(json);
                    })
                }, (failureReason) => {
                    setContentFetchFailed(true);
                }).finally(() => setRunningBlockingOperation(false));
            });
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
                    <div className="row align-items-right ml-auto px-3">
                        {noteId ? <button className="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                            <FontAwesomeIcon icon={faTrashAlt} color="red"></FontAwesomeIcon>
                        </button> : <></>}
                        <button className="btn btn-link ml-2" onClick={() => saveOrCreateNoteAsync()} disabled={runningBlockingOperation}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteNoteAsync}>Delete</button>
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

    async function saveOrCreateNoteAsync() {
        const token = (await authContext.getUserAsync()).access_token;
        setRunningBlockingOperation(true);
        let body = JSON.stringify(getNoteInState());
        let response = null;
        if(noteId != null){
            let url = `/api/notes/${noteId}`;
            response = await fetch(
                        url, 
                        {
                            method: 'PUT', 
                            headers: new Headers({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
                            body: body
                        });
        }
        else{
            let url = `/api/notes`;
            response = await fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                },
                body: body
            });
            let responseJson = await response.json();
            history.push(`/note/${responseJson.id}`);
        }
        setRunningBlockingOperation(false);
    }

    async function deleteNoteAsync() {
        setRunningBlockingOperation(true);

        let token = (await authContext.getUserAsync()).access_token;
        let response = await fetch(`/api/notes/${noteId}`, {method: 'DELETE', headers: new Headers({'Authorization': 'Bearer ' + token})});

        if(response.status === 200){
            // Note was deleted with success, back to home page
            history.push('/');
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