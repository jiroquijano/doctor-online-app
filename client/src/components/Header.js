import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import authContext from '../context/AuthenticationContext';

const Header = () =>{
    const auth = useContext(authContext);
    return (
        <>
            <h1>Doctor Online</h1>
            <nav>
                <NavLink to="/" activeClassName="nav-link--selected">
                    Home
                </NavLink>
                {
                    auth.isAuthenticated ? (
                        <>
                            <NavLink 
                                to="/logout" 
                                activeClassName="nav-link--selected"
                                onClick={()=>{
                                    localStorage.removeItem('token');
                                    auth.authDispatch({type:'CLEAR_TOKEN'});
                                }}
                            >
                                Log out
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" activeClassName="nav-link--selected">
                                Log in
                            </NavLink>
                        </>
                    )
                }
            </nav>
        </>
    );
}
export default Header;