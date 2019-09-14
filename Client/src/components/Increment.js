import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function Increment() {
    const [count, setCount] = useState(0);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h1>You clicked {count} times</h1>
            <Button variant="outlined" color="primary" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
        </Grid>);
}

export default Increment;