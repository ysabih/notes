import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NoteCard.css'

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
        return `Created ${humanize(Date.parse(note.created))}`;
    }
    return `Last modified ${humanize(Date.parse(note.lastModified))}`
}

function humanize(date) {
    var delta = Math.round((+new Date() - date) / 1000);

    var minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    var fuzzy;

    if (delta < 30) {
        fuzzy = 'a moment ago.';
    } else if (delta < minute) {
        fuzzy = delta + ' seconds ago.';
    } else if (delta < 2 * minute) {
        fuzzy = 'a minute ago.'
    } else if (delta < hour) {
        fuzzy = Math.floor(delta / minute) + ' minutes ago.';
    } else if (Math.floor(delta / hour) == 1) {
        fuzzy = '1 hour ago.'
    } else if (delta < day) {
        fuzzy = Math.floor(delta / hour) + ' hours ago.';
    } else if (delta < day * 2) {
        fuzzy = 'yesterday';
    }

    return fuzzy;
}

function truncate(text, maxLegth){
    if(text.length <= maxLegth){
        return text;
    }
    return text.substring(0, maxLegth)+"...";
}

export default NoteCard;