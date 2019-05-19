import { connect } from 'react-stonex'
import ServicesPage from '.'

const mapStoreToProps = (state, modules) => ({
  servicesList: state.services,
  getAllServices: modules.services.getAll,
})

export default connect(mapStoreToProps)(ServicesPage)
