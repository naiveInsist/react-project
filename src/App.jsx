import React from 'react';
import Login from './pages/login';
import Admin from './pages/admin';
import { Route,Switch } from 'react-router-dom';
export default function App(){
    return <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Admin}/>
    </Switch>;
}