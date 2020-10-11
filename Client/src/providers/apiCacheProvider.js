import React, {useState} from 'react';

export const ApiCacheContext = React.createContext({});

export const ApiCacheConsumer = ApiCacheContext.Consumer;


export const ApiCacheProvider = (props) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [dataFetchFailed, setDataFetchFailed] = useState(false);
    const [notesList, setNotesList] = useState(null);

    return <ApiCacheContext.Provider value=
    {{
        dataFetched,
        setDataFetched,
        dataFetchFailed,
        setDataFetchFailed,
        notesList,
        setNotesList
    }}>{props.children}</ApiCacheContext.Provider>;
}
