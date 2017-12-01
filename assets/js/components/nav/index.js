import createActions  from '../../actions/index'
import { createView } from './view'

export const nav = {
  create: function (update) {
    return createView(createActions(update))
  }
}
