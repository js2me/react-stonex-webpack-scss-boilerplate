import React, { Component, Fragment } from 'react'

export default class ServicesPage extends Component {
  componentDidMount() {
    this.props.getAllServices()
  }

  render() {
    const { servicesList } = this.props
    return <Fragment>{JSON.stringify(servicesList)}</Fragment>
  }
}
