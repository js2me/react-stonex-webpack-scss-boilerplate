import React from 'react'
import AsyncComponent from '@common/AsyncComponent'

export const createAsyncComponent = (promise, wrapper) => props => (
  <AsyncComponent promise={promise} props={props} wrapper={wrapper} />
)
