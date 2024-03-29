import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = (props) => {


  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + (1000*60*60));
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({userId: uid, 
                                                     token: token, 
                                                     expiration: tokenExpirationDate.toISOString()
                                                    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  // check if token is in local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && 
       storedData.token &&
       new Date(storedData.expiration) > new Date() ){
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  },[login]);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();  // Time in ms
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  },[token, logout, tokenExpirationDate]);


return {token, login, logout, userId};



} 