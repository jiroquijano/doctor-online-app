import React, {useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import authContext from '../context/AuthenticationContext';

const PrivateRoute = ({component: Component, ...rest})=>{
    const {isAuthenticated} = useEffect(authContext);

    return (
        <Route
            component = {(props)=>(
                    isAuthenticated ? (
                        <Component {...props}/>    
                    ) : (
                        <Redirect to='/login'/>
                    )
                )
            }
            {...rest}
        />
    );
}

export default PrivateRoute;