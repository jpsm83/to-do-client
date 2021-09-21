// component that will manage the private routes - show or not depending if is loggedin

import React from 'react'
import { Redirect, Route } from 'react-router'
import { withAuth } from '../../context/auth.context';

function PrivateRoute(routeProps) {
  // Value viene del AuthProvider
  const { isLoggedIn, isLoading } = routeProps;

  // props provienen del componente PrivateRoute
  const { exact, path } = routeProps;
  const ComponentToShow = routeProps.component;

  // AuthProvider todavía esta cargando la infirmación de la API para comprobar si hay usuario en sesión
  if(isLoading) return <p>Loading...</p>;
  return (
    <Route 
      exact={exact}
      path={path}
      render={
        function(props) {
          if(!isLoggedIn) return <Redirect to="/login" />
          else if(isLoggedIn) return <ComponentToShow {...props} />
        }
      }
    />
  )
}

// connect with the context auth.context.js using withAuth()
export default withAuth(PrivateRoute);