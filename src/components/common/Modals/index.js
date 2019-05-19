import _ from 'lodash'
import React, { Component } from 'react'
import cx from './index.scss'
import AsyncComponent from '@common/AsyncComponent'

const modals = _.omitBy(
  {
    confirm: props => (
      <AsyncComponent
        promise={() =>
          import(/* webpackChunkName: "confirm-modal" */ './Confirm')
        }
        props={props}
      />
    ),
    // imageViewer: props => (
    //   <AsyncComponent
    //     promise={() =>
    //       import(/* webpackChunkName: "image-viewer-modal" */ './ImageViewer')
    //     }
    //     props={props}
    //   />
    // ),
    // confirmModal: props => (
    //   <AsyncComponent
    //     promise={() =>
    //       import(/* webpackChunkName: "confirm-modal" */ './ConfirmModal')
    //     }
    //     props={props}
    //   />
    // ),
    // itemInfo: props => (
    //   <AsyncComponent
    //     promise={() =>
    //       import(/* webpackChunkName: "item-info" */ './ItemInfo/container')
    //     }
    //     props={props}
    //   />
    // ),
  },
  _.isNull
)

export default class Modals extends Component {
  hideActiveModal = () => {
    const { activeModal, hideModal } = this.props
    hideModal(activeModal.name)
  }

  handleClickBackground = e =>
    e.target.classList.contains(cx('root')) && this.hideActiveModal()

  render() {
    const { activeModal: { show, props = {}, name } = {} } = this.props
    const Modal = modals[name]
    return (
      <div
        className={cx('root', { show })}
        onClick={props.closeOnBackground && this.handleClickBackground}
      >
        {show && (
          <Modal
            {...props}
            className={cx('modal')}
            onClose={this.hideActiveModal}
          />
        )}
      </div>
    )
  }
}
