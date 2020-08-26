import React from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import RegistrationPage from '../components/RegistrationPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import PublicRoute from './PublicRoute';

const AppRouter = () =>{

    return (
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <PublicRoute path="/login" component={LoginPage}/>
                    <PublicRoute path="/register" component={RegistrationPage}/>
                </Switch>
            </Router>
        );
}

export default AppRouter;