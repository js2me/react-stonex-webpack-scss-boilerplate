import _ from 'lodash'

export default {
  state: {},
  show(name, props = {}) {
    this.setState({
      ...this.state,
      [name]: {
        ...(this.state[name] || { props, name }),
        show: true,
        props,
      },
    })
  },
  hide(name) {
    this.setState(_.omit(this.state, name))
  },
}
