import { Button, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    message.success('Logout successful');
    history.push('/login');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Welcome, User!</h2>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserDashboard;
