import React from 'react';
import './AppBar.css';
import 'bootstrap/dist/css/bootstrap.css';

const AppBar = () => {
    return (
        <nav className="navbar bg-light navbar-expand-lg fixed-top shadow-box shadow-sm pr-0 d-flex flex-row">
            <div>
                <a className="navbar-brand" href="#">
                    <img src={require('../notes_icon_blue.png')} alt="logo" width="32" height="32" className="d-inline-block align-top"></img>
                    <span className="ml-1 d-none d-sm-inline-block">Notes</span>
                </a>
            </div>

            <div className="flex-grow-1 d-flex flex-row">
                <input id="searchBar" type="text" className="form-control search-field flex-grow-1" placeholder="Search..."></input>
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        YS
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Sign out</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppBar;