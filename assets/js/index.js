'use strict'

import m from 'mithril'
import User from './model/user'
import HomePage from './views/homePage'
import { currentUserName } from './helpers/helperFunctions'

console.log(window.localStorage.getItem('currentUser'))
m.route(document.querySelector('body'), '/', {
  '/': HomePage
})
