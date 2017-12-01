'use strict'

import { layout } from '../pages/layout'
import { home } from '../pages/home'
import { login } from '../pages/login'
import { item } from '../pages/item'

export const createApp = function (update) {
  const pages = {
    Home: home.create(update),
    Login: login.create(update),
    Item: item.create(update)
  }
  return layout.create(update, pages, pages.Home)
}
