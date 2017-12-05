import { createActions} from './actions'
import { createView } from './view'

export const loginForm = {
  create: (update) => {
    return createView(createActions(update))
  }
}
