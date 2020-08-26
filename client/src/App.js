import React, { useReducer,useEffect,useState,useRef} from 'react';
import AppRouter from './routers/AppRouter';
import authReducer from '../src/reducers/authReducer';
import useAxios from '../src/customhooks/useAxios';
import AuthContext from '../src/context/AuthenticationContext';
import './App.css';

function App() {
  const token = useRef(localStorage.getItem('token'));
    const [authToken, authDispatch] = useReducer(authReducer);
    const [isAuthenticated, setAuth] = useState(false);
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState({});
    const {response, error, loading} = useAxios(url,options);
    const userId = useRef('');
    const userType = useRef('');

    const verifyToken = () =>{
        setUrl('/api/verifytoken');
        setOptions({
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token.current}` 
            }
        });
    };

    //handle useAxios results
    useEffect(()=>{
        if(loading === 'done'){
            setAuth(!!response);
            if(response) {
              userId.current = response._id;
              userType.current = response.accountType;
              console.log({id: userId.current, type: userType.current});
            }
        }
    },[response, error, loading]);

    //check token from localstorage on mount
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
    <div className="App">
      <AuthContext.Provider value={{isAuthenticated, authDispatch, loginDetails:{id: userId.current, type: userType.current}}}>
        <AppRouter/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
