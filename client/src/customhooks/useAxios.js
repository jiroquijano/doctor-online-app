import {useEffect, useState} from 'react';
import axios from 'axios';

//usage sample:
// const {response, error, loading} = useAxios('/api/doctors', {method: 'get'});

const useAxios = (url, options)=>{
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(()=>{
        const config = {
            url,
            ...options
        };

        setResponse(null);
        setLoading('idle');
        setError(null);

        const callAxios = async () =>{
            setLoading('loading');
            if(url==='') return;
            try {
                const result = await axios(config);
                setResponse(result.data);
            } catch (error) {
                setError(error.response.data);
            }finally{
                setLoading('done');
            }
        };

        callAxios();
    },[url,options]);

    return {response, loading, error};
};

export default useAxios;