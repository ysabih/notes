import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './AppBar.css'
import { AuthContext } from 'providers/authProvider'
import {USER_PROFILE_URL} from '../utils/oidcConfig'

const AppBar = (props) => {
    const [searching, setSearching] = useState(false);
    const [userName, setUserName] = useState("");

    const authContext = useContext(AuthContext);

    const setSearchString = props.setSearchString;

    useEffect(() => {
        authContext.getUserAsync().then((user) => {
            setUserName(user.profile.given_name);
        })
    }, []);

    function logout() {
        window.location = '/logout';
    }

    function handleSearchStringChange(e) {
        setSearchString(e.target.value);
      }

    return (
        <>
        <nav className="navbar bg-light navbar-expand-lg fixed-top shadow-box shadow-sm d-flex" style={{maxHeight: '80px'}}>
        {
            !searching ?
            <>
                <div className="navbar-brand">
                        <img src={require('../app_logo.png')} alt="logo" width="100" className="d-inline-block align-top"></img>
                </div>

                <div className="flex-grow-1 d-flex flex-row justify-content-end">
                    <button onClick={props.createNewNote} id="addButton" className="btn btn-link"> <FontAwesomeIcon icon={faPlus} /> </button>
                    <button id="searchButton" type="button" className="btn btn-link" onClick={() => setSearching(true)}> <FontAwesomeIcon icon={faSearch} /> </button>
                    {/*  */}
                    <div className="dropdown">
                        <button className="btn btn-link nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="font-weight-bold">{userName}</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href={USER_PROFILE_URL}>Settings</a>
                            <button className="dropdown-item" style={{color: 'red'}} data-toggle="modal" data-target="#logoutModal">Sign out</button>
                        </div>
                    </div>
                </div>

            </>
            :
            <div className="d-flex flex-row no-wrap flex-grow-1 p-0">
                <button id="backButton" type="button" className="btn btn-link pl-0" onClick={() => {setSearching(false); setSearchString("");}}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                <input id="searchBar" type="text" className="form-control flex-grow-1" placeholder="Search..." onChange={handleSearchStringChange} autoFocus></input>
            </div>
        }
        </nav>

        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="logoutModalLabel">Log out</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure you want to log out ?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={logout}>YES</button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default AppBar;