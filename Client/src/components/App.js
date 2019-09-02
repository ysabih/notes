import React, { useState } from 'react';
import './App.css';


function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>You clicked {count} times</h1>
            <button onClick={() => setCount(count+1)}>
                Increment
            </button>
        </div>);
}

export default App;
