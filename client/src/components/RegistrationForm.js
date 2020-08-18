import React from 'react';

const RegistrationForm = ({userType='patient'}) => {
    return (
        <form>
            <div>
                <input type="email" placeholder="email address"/>
                <input 
                    type="password"
                    placeholder="password"
                    minLength={8}
                />
            </div>
            <div>
                <input type="text" placeholder="firstname"/>
                <input type="text" placeholder="lastname"/>
            </div>
            <div>
                {userType==='doctor' ? (
                    <input type="text" placeholder="specialization\/s (separate with commas)"/>
                ) : undefined}
            </div>
        </form>
    );
}

export default RegistrationForm;