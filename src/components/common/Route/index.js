import React from 'react'
import { Route as NakedRoute } from 'react-router-dom'
// import { Route as NakedRoute, Redirect } from 'react-router-dom'
// import { routes } from '@helpers/routes'

// const Redirector = ({ route, location: from }) => (
//   <Redirect
//     to={{
//       pathname: routes[route].path,
//       state: { from },
//     }}
//   />
// )

const Route = ({
  tokenIsNotExpired,
  useLayout,
  component: Component,
  ...rest
}) => (
  <NakedRoute
    {...rest}
    render={props => {
      return <Component {...props} />
      // return tokenIsNotExpired ? (
      //   props.location.pathname === routes.login.path ? (
      //     <Redirector route="clients" location={props.location} />
      //   ) : (
      //     <Component {...props} />
      //   )
      // ) : props.location.pathname === routes.login.path ? (
      //   <Component {...props} />
      // ) : (
      //   <Redirector route="login" location={props.location} />
      // )
    }}
  />
)

export default Route
