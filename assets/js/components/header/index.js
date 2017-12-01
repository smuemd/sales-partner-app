'use strict'

import { nav } from '../nav/index'
import { createView } from './view.js'

export const header = {
  create: (update) => {
    let components = {
      nav: nav.create(update)
    }
    return createView(components)
  }
}

// function createView (update) {
//   return createView(createActions(update))
// }
