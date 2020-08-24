import React,{useContext} from 'react';
import LoginForm from './LoginForm';
import {Link, Redirect} from 'react-router-dom';
import authContext from '../context/AuthenticationContext';

const LoginPage = () => {
    const auth = useContext(authContext);
    return (
        <>
            {
                auth.isAuthenticated ? (
                    <Redirect to="/"/>
                ):(
                    <>
                        <LoginForm/>
                        <div>
                            Not yet registered?
                            <Link to="/register">Register here</Link>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default LoginPage;