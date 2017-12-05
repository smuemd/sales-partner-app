import { extLink } from '../../components/externalLink'
import { loginForm} from '../../components/login-form'
import { createView } from './view'

export const login = {
  create: (update) => {
    const components = {
      LoginForm: loginForm.create(update),
      ExternalLink: extLink.create(update)
    }

    return createView(components)
  }
}
