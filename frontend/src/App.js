import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';

import './App.css';

function App() {
  return (
    
    <BrowserRouter>
      <MainNavigation />
        <main>
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
            <Redirect to='/' />
          </Switch>
        </main>
      </BrowserRouter>
  );
}

export default App;
