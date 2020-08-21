import React, { useReducer } from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import RegistrationPage from '../components/RegistrationPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import AuthContext from '../context/AuthenticationContext';
import authReducer from '../reducers/authReducer';

const AppRouter = () =>{
    const [authentication, authDispatch] = useReducer(authReducer);
    return (
        <AuthContext.Provider value={{authentication, authDispatch}}>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegistrationPage}/>
                </Switch>
            </Router>
        </AuthContext.Provider>);
}

export default AppRouter;