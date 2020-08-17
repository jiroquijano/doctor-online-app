import React from 'react';
import LoginForm from './LoginForm';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <LoginForm/>
            <div>
                Not yet registered?
                <Link to="/register">Register here</Link>
            </div>
        </>
    );
};

export default LoginPage;