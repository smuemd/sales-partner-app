'use strict'
import { createView } from './view'
import { extlink } from '../../components/externalLink/index'

export const item = {

  create: (update) => {
    const components = {
      ExternalLink: extlink.create(update)
    }

    return createView(components)
  }
}
