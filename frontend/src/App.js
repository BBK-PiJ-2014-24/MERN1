import React, { Suspense } from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

/// LAZY LOADS
const Users = React.lazy(()=> import('./user/pages/Users'));
const NewPlace = React.lazy(()=> import('./places/pages/NewPlace/NewPlace'));
const UserPlaces = React.lazy(()=> import('./places/pages/UserPlaces/UserPlaces'));
const UpdatePlace = React.lazy(()=> import('./places/pages/UpdatePlace/UpdatePlace'));
const Auth = React.lazy(()=> import('./places/pages/Auth/Auth'));

import './App.css';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';


function App() {

 const {token, login, logout, userId } = useAuth();

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
              <Suspense fallback={<div className='center'><LoadingSpinner /></div>}>
                  {routes}
              </Suspense>
        </main>
      </BrowserRouter>
   </AuthContext.Provider> 
  );
}

export default App;
