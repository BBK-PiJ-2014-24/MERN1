import {useState, useCallback, useEffect, useRef } from 'react';




export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]); // stores data during render recycles

    const sendRequest = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);

        const httpAbortCtrl = new window.AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try{
            const response = await fetch(url, {
                method,
                body, 
                headers,
                signal: httpAbortCtrl.signal
            });
            
            const data = await response.json();
             activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
             );
            
            if(!response.ok){
                throw new Error(data.message);
            }
            setIsLoading(false);
            return data;

        }catch(err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []); //useCallback avoids unecessary render cyles and risks of infinite loops.
    
    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {isLoading, error, sendRequest, clearError };

}