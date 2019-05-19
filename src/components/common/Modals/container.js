import _ from 'lodash'
import { connect } from 'react-stonex'
import Modals from '.'

const mapStoreToProps = state => {
  const activeModal = _.filter(state.modals, modal => modal.show)[0] || {}
  return { activeModal }
}

export default connect(mapStoreToProps)(Modals)
