'use strict'

import m from 'mithril'
import HomePage from './views/homePage'
import User from './model/user'

User.checkLogin()
m.route(document.querySelector('body'), '/', {
  '/': HomePage
})
