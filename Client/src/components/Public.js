import React from 'react';
import {useState, useContext, useEffect}from 'react';
import { AuthContext } from "../providers/authProvider";
import Home from './Home';

export const Public = () => {

    const [user, setUser] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.getUserAsync().then((user) => {
            setUser(user);
        })
    }, []);

    function renderContent() {
        if(user){
            return <Home/>
        }
        else{
            return <h2>Welcome, Login or Sign up</h2>
        }
    }
    
    return renderContent();
};
