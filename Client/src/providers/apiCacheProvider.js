import React, {useState} from 'react';
import apiService from 'services/apiService'

export const ApiCacheContext = React.createContext({});

export const ApiCacheConsumer = ApiCacheContext.Consumer;


export const ApiCacheProvider = (props) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const [notesList, setNotesList] = useState(null);

    const getOrFetchNotesAsync = async () => {
        if(notesList != null && dataFetched){
            return notesList;
        }
        try{
            let notes = await apiService.getAllNotesAsync();
            setNotesList(notes);
            setDataFetched(true);
            return notes;
        }
        catch(e) {
            setDataFetchFailed(true);
            return null;
        }
    }

    return <ApiCacheContext.Provider value=
    {{
        dataFetched,
        setDataFetched,
        dataFetchFailed,
        setDataFetchFailed,
        notesList,
        setNotesList,
        getOrFetchNotesAsync
    }}>{props.children}</ApiCacheContext.Provider>;
}
