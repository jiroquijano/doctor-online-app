import {useEffect, useState} from 'react';
import axios from 'axios';

//usage sample:
// const {response, error, loading} = useAxios('/api/doctors', {method: 'get'});

const useAxios = (url, options)=>{
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const config = {
            url,
            ...options
        };

        const callAxios = async () =>{
            setLoading(true);
            try {
                const result = await axios(config);
                setResponse(result.data);
            } catch (error) {
                setError(error);
            }finally{
                setLoading(false);
            }
        };

        callAxios();
    },[]);

    return {response, loading, error};
};

export default useAxios;