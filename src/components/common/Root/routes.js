import { Redirect, Switch } from 'react-router-dom'
import React from 'react'
import Route from '@common/Route/container'
import Layout from '@common/Layout/container'
import { routes } from '@helpers/routes'
import { createAsyncComponent } from '@helpers/react'

export const createReactRoute = (route, wrapLayout = false) => (
  <Route
    exact
    path={route.path}
    component={createAsyncComponent(
      route.component,
      wrapLayout ? Layout : null
    )}
  />
)

export default (
  <Switch>
    {createReactRoute(routes.services, true)}
    {/* {createReactRoute(routes.login)} */}
    <Redirect path="*" to={routes.services.path} />
  </Switch>
)
