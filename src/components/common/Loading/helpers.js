import React from 'react'
import cx from './index.scss'
import Loading from '.'

const createLoadingComponent = ({
  isDark,
  className,
  customContainer: CustomContainer,
} = {}) => {
  const ReactLoadingElement = (
    <Loading className={cx('loading-icon', className)} dark={isDark} />
  )

  return CustomContainer ? (
    <CustomContainer>{ReactLoadingElement}</CustomContainer>
  ) : (
    ReactLoadingElement
  )
}

export const displaySpinnerIf = (isLoading, content, loadingOptions) =>
  isLoading ? createLoadingComponent(loadingOptions) : content()
