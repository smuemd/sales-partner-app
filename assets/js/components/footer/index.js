'use strict'
import { createActions} from './actions'
import { createView } from './view'


export const footer = {
  create: (update) => {
    const actions = createActions(update)
    return createView(actions)
  }
}
