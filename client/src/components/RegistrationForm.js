import React, {useState} from 'react';

const RegistrationForm = () => {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [licenceNumber, setLicenceNumber] = useState('');
    const [name, setName] = useState({});

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        let registrationDetails = {
            userType,
            email,
            password,
            name
        };
        if(userType === 'doctor') {
            registrationDetails = {
                ...registrationDetails,
                specializations,
                licenceNumber
            };
        }
        console.log(registrationDetails);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label>
                    I would like to register as a:
                    <select name="usertype" onChange={(e)=>{
                        setUserType(e.target.value)
                    }}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </label>
                <div>
                    {userType ==='doctor' ? (
                        <>
                            <label>
                                Specialization/s:
                                <input 
                                    type="text"
                                    placeholder="(separate with commas)"
                                    name="specializations"
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