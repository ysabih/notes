import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './AppBar.css'

const AppBar = () => {
    const [searching, setSearching] = useState(false);

    return (
        <nav className="navbar bg-light navbar-expand-lg fixed-top shadow-box shadow-sm d-flex" >
        {
            !searching ?
            <>
                <div className>
                    <a className="navbar-brand" href="#">
                        <img src={require('../notes_icon_blue.png')} alt="logo" width="32" height="32" className="d-inline-block align-top"></img>
                        <span className="ml-1 d-none d-sm-inline-block">Notes</span>
                    </a>
                </div>

                <div className="flex-grow-1 d-flex flex-row justify-content-end">
                    <button id="addButton" type="button" className="btn btn-link"> <FontAwesomeIcon icon={faPlus} /> </button>
                    <button id="searchButton" type="button" className="btn btn-link" onClick={() => setSearching(true)}> <FontAwesomeIcon icon={faSearch} /> </button>
                    {/*  */}
                    <div className="dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="font-weight-bold">YS</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">Sign out</a>
                        </div>
                    </div>
                </div>
            </>
            :
            <div className="d-flex flex-row no-wrap flex-grow-1 p-0">
                <button id="backButton" type="button" className="btn btn-link" onClick={() => setSearching(false)}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                <input id="searchBar" type="text" className="form-control flex-grow-1" placeholder="Search..."></input>
            </div>
        }
        </nav>
    );
};

export default AppBar;