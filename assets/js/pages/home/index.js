// import { articles } from '../articles'
// import { popularTags } from '../popularTags'
import { extlink } from '../../components/externalLink/index'
import { createView } from './view'

export const home = {
  create: (update) => {
    const components = {
      // Articles: articles.create(update),
      // PopularTags: popularTags.create(update)
      ExternalLink: extlink.create(update)
    }
    return createView(components)
  }
}
