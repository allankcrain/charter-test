import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import UserList from './components/UserList';
import User from './components/User';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users/:userId">
          <User />
        </Route>
        <Route exact path="/users/">
          <UserList />
        </Route>
        <Route>
          <Redirect to="/users/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
