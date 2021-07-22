import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        authTokens && authTokens !== 'undefined' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}

export default PrivateRoute
