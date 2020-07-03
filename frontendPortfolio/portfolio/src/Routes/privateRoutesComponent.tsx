import React from 'react';
import { Route, Redirect } from 'react-router';

export const PrivateRoute = (props: any) => {
  const isLogged = localStorage.getItem('auth-token');

  return isLogged ? <Route {...props} /> : <Redirect to='/' />;
};
