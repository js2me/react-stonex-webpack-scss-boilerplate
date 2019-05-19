import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-stonex'
import React, { Fragment } from 'react'
import { createPortal } from 'react-dom'
import routes from './routes'
import AsyncComponent from '@common/AsyncComponent'

import store from '@store'

import './index.scss'

const Outside = ({ children }) =>
  createPortal(children, document.getElementById('outside'))

const Root = () => {
  return (
    <Provider store={store}>
      <Router forceRefresh={!('pushState' in window.history)}>
        <Fragment>
          {routes}
          <Outside>
            <Fragment>
              <AsyncComponent
                promise={() =>
                  import(
                    /* webpackChunkName: "modals-container" */ '@common/Modals/container'
                  )
                }
              />
            </Fragment>
          </Outside>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default Root
