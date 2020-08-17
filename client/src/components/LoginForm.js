import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = JSON.stringify({email,password});
        const result = axios({
            method:'post',
            url: '/api/doctor/login',
            headers: {
                'Content-type' : 'application/json'
            },
            data : data
        });
        result.then((response)=>{
            localStorage.setItem("token",response.data.token);
        });
        result.catch((error)=>{
            console.log(error);
            alert("log in failed");
            localStorage.removeItem("token");
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <input 
                placeholder="email"
                type="text"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                placeholder="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button>Log in</button>
        </form>
    );
};

export default LoginForm;