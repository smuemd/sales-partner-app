import { createView } from './view.js'
import { footer } from '../../components/footer/index'
import { header } from '../../components/header/index'

export const layout = {
  create: (update, pages, pageToRender) => {
    const components = {
      Footer: footer.create(update),
      Header: header.create(update)
    }

    return createView(components, pages, pageToRender)
  }
}
