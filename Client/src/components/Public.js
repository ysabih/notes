import React from 'react';
import {useState, useContext, useEffect}from 'react';
import { AuthContext } from "../providers/authProvider";
import NotesContainer from './NotesContainer';

export const Public = () => {

    const [user, setUser] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.signInSilentAsync().then((user) => {
            console.log("Silent sign in. user:", user);
            setUser(user);
        })
    }, []);

    function renderWelcomePage() {
        return (
        <>
        <nav className="navbar bg-light navbar-expand-lg fixed-top shadow-box shadow-sm d-flex" style={{maxHeight: '80px'}}>
            <div className="navbar-brand">
                <img src={require('../app_logo.png')} alt="logo" width="100" className="d-inline-block align-top"></img>
            </div>
            <div className="flex-grow-1 d-flex flex-row justify-content-end">
                <button onClick={() => authContext.loginAsync(true)} className="btn btn-outline-primary">Sign up</button>
                <button onClick={() => authContext.loginAsync(false)} className="btn btn-primary ml-2">Sign in</button>
            </div>
        </nav>
        <div className="container-fluid" style={{marginTop: '120px'}}>
            <h2 className="text-center">Create and edit your personal notes on any device</h2>
            <div className="text-center">
                <p className="">Store and edit your notes online from any device using a simple and intuitive interface, 
                the experience is similar to your favourite sticky notes app on your phone and laptop</p>
            </div>
            <div className="text-center" style={{marginTop: '20px', marginBottom: '20px'}}>
                <button onClick={() => authContext.loginAsync(false)} className="btn btn-primary btn-lg rounded-pill shadow">Get Started</button>
            </div>
            <div className="row">
                <div className="align-self-center col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                    <img src={require('../mockup_mid_res.png')} className="w-100" alt="laptop and iphone mockup"></img>
                </div>
            </div>
        </div>
        </>);
    }

    function renderContent() {
        if(user){
            return <NotesContainer/>
        }
        else{
            return renderWelcomePage();
        }
    }
    
    return renderContent();
};
