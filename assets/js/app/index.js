import { layout } from '../pages/layout'
import { home } from '../pages/home'
import { login } from '../pages/login'
import { account } from '../pages/account/index'

export const createApp = function (update) {
  const pages = {
    Home: home.create(update),
    Login: login.create(update),
    Account: account.create(update)
  }

  return layout.create(update, pages, pages.Home)
}
