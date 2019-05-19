import React from 'react'
import cx from './index.scss'

const Layout = ({ modalIsShowed, children }) => (
  <div className={cx('root')}>
    <div
      className={cx('layout', 'container', {
        blur: modalIsShowed,
      })}
    >
      {children}
    </div>
  </div>
)
export default Layout
