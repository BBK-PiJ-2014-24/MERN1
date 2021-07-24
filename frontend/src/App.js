import React, {useState, useCallback} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Auth from './places/pages/Auth/Auth';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);


  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if(isLoggedIn){
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
   <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}} >
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
