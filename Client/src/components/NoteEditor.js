import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NoteEditor = (props) => {
    return (
        <div className="container-fluid">
            <div className="container-fluid mb-2 p-0">
                <div className="row justify-content-end">
                    <button className="btn btn-link ">
                        Save
                    </button>
                    <button className="btn btn-link">
                        Save &#38; Close
                    </button>
                    <Link className="btn btn-lg" to="/">
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
            <div>
                <input className="form-control form-control-lg form-group font-weight-bold" type="text" placeholder="Title" autoFocus />
                <textarea className="form-control form-group" rows="25" placeholder="Note something..."/>
            </div>
        </div>
    );
};

export default NoteEditor;