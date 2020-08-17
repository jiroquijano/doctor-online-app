import React from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

const AppRouter = () =>(
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={LoginPage}/>
        </Switch>
    </Router>
);

export default AppRouter;