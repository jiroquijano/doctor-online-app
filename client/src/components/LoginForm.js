import React, {useState, useEffect} from 'react';
import useAxios from '../customhooks/useAxios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState('');
    const {response, error,loading} = useAxios(url, options);

    useEffect(()=>{
        if(response){
            localStorage.setItem("token",response.token);
        }
        if(error){
            alert("log in failed");
            localStorage.removeItem("token");
        }
    }, [response,error]);

    useEffect(()=>{
        if(loading === false){
            setEmail('');
            setPassword('');
        }
    },[loading]);

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