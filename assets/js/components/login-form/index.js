import { createActions } from './actions'
import { createView } from './view'

export const loginForm = {
  create: (update) => {

    const actions = createActions(update)
    return createView(actions)
  }

}
