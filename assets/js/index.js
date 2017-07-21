'use strict'

import m from 'mithril'
import HomePage from './views/homePage'

m.route(document.querySelector('body'), '/', {
  '/': HomePage
})
