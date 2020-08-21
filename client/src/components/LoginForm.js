import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import useAxios from '../customhooks/useAxios';
import authContext from '../context/AuthenticationContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState('');
    const {response, error,loading} = useAxios(url, options);
    let history = useHistory();
    const auth = useContext(authContext);

    useEffect(()=>{
        if(loading === 'done'){
            if(response){
                localStorage.setItem("token",response.token);
                setEmail('');
                setPassword('');
                auth.authDispatch({type: 'LOG_IN'});
                history.push('/');
            }
            if(error){
                alert(error);
                localStorage.removeItem("token");
            }
        }
    }, [response,error,loading,history,auth]);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = JSON.stringify({email,password});
        setUrl('/api/login');
        setOptions({
            method: 'post',
            headers: {
                'Content-type' : 'application/json'
            },
            data : data
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <input 
                placeholder="email"
                type="text"
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                value={email}
            />
            <input 
                placeholder="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                value={password}
            />
            <button>Log in</button>
        </form>
    );
};

export default LoginForm;