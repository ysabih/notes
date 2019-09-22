import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Note from './Note';

const NotesContainer = () => {

    const notesList = [
        {
            title: "First noteFirst note First note First noteFirst note",
            content: "Proin ac magna dignissim, consectetur orci eu, cursus erat Proin ac magna dignissim, consectetur orci eu, cursus erat Proin ac magna dignissim, consectetur orci eu, cursus erat"
        },
        {
            title: "Another one",
            content: `Proin ac magna dignissim, consectetur orci eu, cursus erat. Maecenas ligula augue, auctor et elementum vitae,
             hendrerit id mi. Curabitur maximus Proin ac magna dignissim, consectetur orci eu, cursus erat.
             Maecenas ligula augue, auctor et elementum vitae, hendrerit id mi. Curabitur maximus
             id mi. Curabitur maximus Proin ac magna dignissim, consectetur orci eu, cursus erat.
             Maecenas ligula augue, auctor et elementum vitae, hendrerit id mi. Curabitur maximus
             id mi. Curabitur maximus Proin ac magna dignissim, consectetur orci eu, cursus erat.
             Maecenas ligula augue, auctor et elementum vitae, hendrerit id mi. Curabitur maximus `
        },
        {
            title: "Third one",
            content: "Proin ac magna dignissim, consectetur orci eu, cursus erat. Proin ac magna dignissim, consectetur orci eu, cursus erat"
        },
    ];

    return (
        <div className="card-columns pt-md-3 pt-lg-3 pt-sm-5">
            {
                repeatList(notesList)
            }
        </div>
    );
};

function  repeatList (list) {
    let allNotes = [];
    for (let index = 0; index < 5; index++) {
        allNotes = allNotes.concat(list.map((element) => {
            return <Note {...element}></Note>;
        }))
    }
    return allNotes;
};

function getFewNotes(notesList) {
    return <>
        <Note {...notesList[0]}></Note>
    </>
};


export default NotesContainer;