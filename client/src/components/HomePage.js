import React, {useContext} from 'react';
import PatientDashboard from '../components/patients/PatientDashboard';
import authContext from '../context/AuthenticationContext';


const HomePage = () => {
    const {loginDetails} = useContext(authContext);
    return (
        <>
            {loginDetails.type==='patient' && <PatientDashboard/>}
            {loginDetails.type==='doctor' && 'yer a doctah'}
        </>
    );

};

export default HomePage;