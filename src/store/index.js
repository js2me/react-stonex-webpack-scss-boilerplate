import { StonexStore } from 'stonex'
import { ReactStonexModifier } from 'react-stonex'

import modules from './modules'

export default new StonexStore(modules, {
  modifiers: [ReactStonexModifier],
})
