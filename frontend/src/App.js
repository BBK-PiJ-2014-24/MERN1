import React, {useState, useCallback, useEffect} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Auth from './places/pages/Auth/Auth';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

import './App.css';

let logoutTimer;


function App() {

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



  let routes;

  if(token){
    routes = (
        <Switch>
            <Route exact path='/'>
              <Users />
            </Route>
            <Route exact path='/:userId/places'>
              <UserPlaces />
            </Route>
            <Route exact path='/places/new'>
              <NewPlace />
            </Route>
            <Route exact path='/places/:placeId'>
              <UpdatePlace />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
  } else {
    routes = (
        <Switch>
            <Route exact path='/'>
              <Users />
            </Route>
            <Route exact path='/:userId/places'>
              <UserPlaces />
            </Route>
            <Route exact path='/auth'>
              <Auth />
            </Route>
            <Redirect to='/auth' />
        </Switch>
    );
  }

  return (
   <AuthContext.Provider value={{isLoggedIn: !!token, 
                                token: token,
                                userId: userId, 
                                login: login, 
                                logout: logout}} >
    <BrowserRouter>
      <MainNavigation />
        <main>
            {routes}
        </main>
      </BrowserRouter>
   </AuthContext.Provider> 
  );
}

export default App;
