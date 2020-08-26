import React from 'react';
import ConsultRequestForm from './ConsultRequestForm';

const PatientDashboard = () =>{
    return (
        <>
            <div>
                How are you feeling today?
                <ConsultRequestForm/>
            </div>
        </>
    );
}

export default PatientDashboard;