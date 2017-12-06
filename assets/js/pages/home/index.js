// import { articles } from '../articles'
// import { popularTags } from '../popularTags'
import { extLink } from '../../components/externalLink/index'
import { createView } from './view'

export const home = {
  create: (update) => {
    const components = {
      ExternalLink: extLink.create(update)
    }

    return createView(components)
  }
}