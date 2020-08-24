import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import authContext from '../context/AuthenticationContext';

const PublicRoute = ({component:Component, ...rest}) => {
    const {isAuthenticated} = useContext(authContext);
    return (
        <Route
            component={(props)=>(
                    isAuthenticated ? (
                        <Redirect to='/'/>
                    ):(
                        <Component {...props}/>
                    )
                )
            }
            {...rest}
        />
    );
};

export default PublicRoute;