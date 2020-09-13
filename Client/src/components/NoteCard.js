import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NoteCard.css'
import moment from 'moment';

const maxTitleLength = 32;
const maxContentLength = 256;

const NoteCard = (props) => {
    return (
        <div className="card" id={props.note.id} onClick={props.openNote}>
            <div className="card-body shadow-box shadow-sm">
                <button className="btn btn-link" style={{padding: '0px 0px 0px 0px'}}>
                    <h5 className="card-title note-title" onClick={props.openNote}>{truncate(props.note.title, maxTitleLength)}</h5>
                </button>
                <p className="card-text text-justify">{truncate(props.note.content, maxContentLength)}</p>
                <p className="card-text text-right"><small className="text-muted">{getLastModifiedString(props.note)}</small></p>
            </div>
        </div>
    );
};

function getLastModifiedString(note){
    if(note.lastModified === note.created){
        return `Created ${humanize(note.created)}`;
    }
    return `Last modified ${humanize(note.lastModified)}`
}

function humanize (dateString) {
    let m = moment(dateString);
    return m.fromNow();
}

function truncate(text, maxLegth){
    if(text.length <= maxLegth){
        return text;
    }
    return text.substring(0, maxLegth)+"...";
}

export default NoteCard;