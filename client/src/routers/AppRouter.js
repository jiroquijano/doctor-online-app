import React, { useReducer,useEffect,useState} from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import RegistrationPage from '../components/RegistrationPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import AuthContext from '../context/AuthenticationContext';
import authReducer from '../reducers/authReducer';

const AppRouter = () =>{
    const token = localStorage.getItem('token');
    const [authToken, authDispatch] = useReducer(authReducer);
    const [isAuthenticated, setAuth] = useState(false);

    useEffect(()=>{
        token ? setAuth(true) : setAuth(false);
        console.log(`logged ${isAuthenticated ? 'in' : 'out'}`);
    },[authToken,token,isAuthenticated]);

    return (
        <AuthContext.Provider value={{isAuthenticated, authDispatch}}>
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