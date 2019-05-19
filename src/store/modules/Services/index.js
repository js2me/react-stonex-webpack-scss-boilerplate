import api from '@api'

export default {
  state: {},
  async getAll() {
    let { data } = await api.get('/services')
    if (!data) {
      data = [{ name: 'Service1', status: 'working' }]
    }
    // if (!err) {
    this.setState(data)
    // }
  },
}
