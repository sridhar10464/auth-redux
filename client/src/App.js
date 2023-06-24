import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserDashboard from './components/UserDashboard';

const App = () => {
    
  const isAuthenticated = useSelector(state => state.auth && state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
      <Route path="/register">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <RegisterForm />}
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <LoginForm />}
        </Route>
        <Route path="/dashboard">
          {!isAuthenticated ? <Redirect to="/login" /> : <UserDashboard />}
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;