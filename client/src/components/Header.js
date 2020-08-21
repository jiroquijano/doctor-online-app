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
                    auth.authentication ? (
                        <>
                            <NavLink 
                                to="/logout" 
                                activeClassName="nav-link--selected"
                                onClick={()=>auth.authDispatch({type:'LOG_OUT'})}
                            >
                                Log Out
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" activeClassName="nav-link--selected">
                                Login
                            </NavLink>
                        </>
                    )
                }
            </nav>
        </>
    );
}
export default Header;