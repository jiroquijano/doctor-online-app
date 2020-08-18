import React from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import RegistrationPage from '../components/RegistrationPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

const AppRouter = () =>(
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegistrationPage}/>
        </Switch>
    </Router>
);

export default AppRouter;