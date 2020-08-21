import React, {useState,useEffect} from 'react';
import useAxios from '../customhooks/useAxios';
import {useHistory} from 'react-router-dom';

const RegistrationForm = () => {
    const [accountType, setAccountType] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [licenceNumber, setLicenceNumber] = useState('');
    const [name, setName] = useState({});
    const [url, setUrl] = useState('');
    const [options, setOptions] = useState({});
    const {response, error, loading} = useAxios(url, options);
    let history = useHistory();

    useEffect(()=>{
        if(response){
            console.log(response);
            history.push('/');
        }
        if(error){
            console.log(error);
        }
    },[response,error,history]);

    useEffect(()=>{
        if(loading === false){
            setAccountType('patient');
            setEmail('');
            setPassword('');
            setSpecializations([]);
            setLicenceNumber('');
            setName({});
        }
    },[loading]);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        let registrationDetails = {
            accountType,
            email,
            password,
            name
        };
        if(accountType === 'doctor') {
            registrationDetails = {
                ...registrationDetails,
                specializations,
                licenceNumber
            };
        }
        const data = JSON.stringify(registrationDetails);
        setUrl('/api/register');
        setOptions({
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            data : data
        });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label>
                    I would like to register as a:
                    <select 
                        name="accountType"
                        value={accountType}
                        onChange={(e)=>{
                        setAccountType(e.target.value)
                    }}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </label>
                <div>
                    {accountType ==='doctor' ? (
                        <>
                            <label>
                                Specialization/s:
                                <input 
                                    type="text"
                                    placeholder="(separate with commas)"
                                    name="specializations"
                                    value={specializations}
                                    onChange={(e)=>{
                                        setSpecializations(e.target.value.split(',').map(curr=>curr.trim()))
                                    }}
                                />
                            </label>
                            <label>
                                Licence number:
                                <input 
                                    type="text"
                                    placeholder="valid licence number"
                                    value={licenceNumber}
                                    name="licence"
                                    required={true}
                                    minLength={3}
                                    onChange={(e)=>{
                                        setLicenceNumber(e.target.value)
                                    }}
                                />
                            </label>
                        </>
                    ) : undefined}
                </div>
            </div>
            <div>
                <label>
                    email:
                    <input type="email"
                        placeholder="email address"
                        name="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                </label>
                <label>
                    password:
                    <input 
                        type="password"
                        placeholder="password"
                        minLength={8}
                        value={password}
                        name="password"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    first name:
                    <input 
                        type="text"
                        placeholder="firstname"
                        name="firstname"
                        value={name.firstName||''}
                        onChange={(e)=>{
                            setName({...name, firstName:e.target.value})
                        }}
                    />
                </label>
                <label>
                    last name:
                    <input 
                        type="text"
                        placeholder="lastname"
                        name="lastname"
                        value={name.lastName||''}
                        onChange={(e)=>{
                            setName({...name, lastName:e.target.value})
                        }}
                    />
                </label>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default RegistrationForm;