import { extLink } from '../../components/externalLink'
import { createView } from './view'

export const account = {

  create: (update) => {
    const components = {
      ExternalLink: extLink.create(update)
    }

    return createView(components)
  }
}
