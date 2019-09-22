import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const maxTitleLength = 32;
const maxContentLength = 256;

const Note = (props) => {
    return (
        <div className="card">
            <div className="card-body shadow-box shadow-sm">
                <h4 className="card-title">{truncate(props.title, maxTitleLength)}</h4>
                <p className="card-text text-justify">{truncate(props.content, maxContentLength)}</p>
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

export default Note;