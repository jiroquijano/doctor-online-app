import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () =>(
    <>
        <h1>Doctor Online</h1>
        <nav>
            <NavLink to="/" activeClassName="nav-link--selected">
                Home
            </NavLink>
            <NavLink to="/login" activeClassName="nav-link--selected">
                Login
            </NavLink>
        </nav>
    </>
);

export default Header;