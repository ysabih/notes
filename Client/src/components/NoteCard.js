import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NoteCard.css'

const maxTitleLength = 32;
const maxContentLength = 256;

const NoteCard = (props) => {
    return (
        <div className="card" id={props.note.id}>
            <div className="card-body shadow-box shadow-sm">
                <h4 className="card-title note-title">{truncate(props.note.title, maxTitleLength)}</h4>
                <p className="card-text text-justify">{truncate(props.note.content, maxContentLength)}</p>
            </div>
        </div>
    );
};

function truncate(text, maxLegth){
    if(text.length <= maxLegth){
        return text;
    }
    return text.substring(0, maxLegth)+"...";
}

export default NoteCard;