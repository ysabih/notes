import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';


function App() {
    const [count, setCount] = useState(0);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h1>You clicked {count} times</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </Grid>);
}

export default App;
