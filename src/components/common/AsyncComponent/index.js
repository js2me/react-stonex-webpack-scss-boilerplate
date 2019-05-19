import React, { PureComponent } from 'react'
import Loading from '@common/Loading'
import cx from './index.scss'

class AsyncComponent extends PureComponent {
  state = {
    isLoading: true,
    LoadedComponent: null,
  }

  componentWillMount() {
    const { promise } = this.props

    promise().then(({ default: LoadedComponent }) =>
      this.setState({ LoadedComponent, isLoading: false })
    )
  }

  render() {
    const { isLoading, LoadedComponent } = this.state
    const { props, wrapper: Wrapper } = this.props
    return isLoading ? (
      <div className={cx('root')}>
        <Loading className={cx('loading-icon')} dark sizeX={13} />
      </div>
    ) : Wrapper ? (
      <Wrapper>
        <LoadedComponent {...props} />
      </Wrapper>
    ) : (
      <LoadedComponent {...props} />
    )
  }
}

export default AsyncComponent
