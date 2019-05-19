import _ from 'lodash'
import React from 'react'
import cx from './index.scss'

const ConfirmModal = ({
  className,
  onClose,
  question,
  description,
  onResponse,
  customRender,
  classes = {},
  labels = {},
  highlightApplyButton = false,
}) => (
  <div className={cx('root', className)}>
    <header>
      <span className={cx('title')}>{question}</span>
      <i
        className={cx('fas fa-times', 'close-icon')}
        onClick={() => {
          onResponse(false)
          onClose()
        }}
      />
    </header>
    {description && <label className={cx('description')}>{description}</label>}
    {customRender ? (
      customRender(onClose)
    ) : (
      <div className={cx('actions')}>
        <button
          className={cx({ red: !highlightApplyButton })}
          onClick={() => {
            onResponse(false)
            onClose()
          }}
        >
          {labels.cancel || 'Нет'}
        </button>
        <button
          className={cx({ green: highlightApplyButton })}
          onClick={() => {
            onResponse(true)
            onClose()
          }}
        >
          {labels.apply || 'Да'}
        </button>
      </div>
    )}
  </div>
)

ConfirmModal.defaultProps = {
  onResponse: _.noop,
}

export default ConfirmModal
