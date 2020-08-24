import React, { useReducer,useEffect,useState,useRef} from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import RegistrationPage from '../components/RegistrationPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import AuthContext from '../context/AuthenticationContext';
import authReducer from '../reducers/authReducer';
import useAxios from '../customhooks/useAxios';
import PublicRoute from './PublicRoute';

const AppRouter = () =>{
    const token = useRef(localStorage.getItem('token'));
    const [authToken, authDispatch] = useReducer(authReducer);
    const [isAuthenticated, setAuth] = useState(false);
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState({});
    const {response, error, loading} = useAxios(url,options);

    const verifyToken = () =>{
        setUrl('/api/verifytoken');
        setOptions({
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token.current}` 
            }
        });
    };

    useEffect(()=>{
        if(loading === 'done'){
            setAuth(!!response);
        }
    },[response, error, loading]);

    useEffect(()=>{
        token.current=localStorage.getItem('token');
        if(token.current) {
           verifyToken();
        }
    },[]);

    //on auth change, set axios options
    useEffect(()=>{
        token.current = authToken;
        if(!token.current) return setAuth(false);
        verifyToken();
    },[authToken]);

    return (
        <AuthContext.Provider value={{isAuthenticated, authDispatch}}>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <PublicRoute path="/login" component={LoginPage}/>
                    <PublicRoute path="/register" component={RegistrationPage}/>
                </Switch>
            </Router>
        </AuthContext.Provider>);
}

export default AppRouter;