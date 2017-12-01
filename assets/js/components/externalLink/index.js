import { createView } from './view'

export const extlink = {
  create: (update) => {
    return createView(update)
  }
}
