import { extlink } from '../../components/externalLink'
import { loginForm} from '../../components/login-form'
import { createView } from './view'

export const login = {

  create: (update) => {
    const components = {
      LoginForm: loginForm.create(update),
      ExternalLink: extlink.create(update)
    }
    return createView(components)
  }
}
