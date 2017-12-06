import { nav } from '../nav'
import { createView } from './view'

export const header = {
  create: update => {
    const components = {
      Nav: nav.create(update)
    }

    return createView(components)
  }
}
