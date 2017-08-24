'use strict'
import m from 'mithril'
import settings from './settings'
import createModel from './model'
import createDataAPI from './dataAPI'
import createActions from './actions'
import createView from './view'
import createRouteResolver from './routes'

console.log('you can use ES6 here : )')

window.addEventListener('DOMContentLoaded', main())

function main () {
  const model = createModel(settings)
  const dataAPI = createDataAPI(settings)
  const actions = createActions(model, dataAPI)
  const view = createView() // vwApp(model, actions)
  const routeResolver = createRouteResolver(model, actions, view)
  const defaultRoute = settings.defaultRoute

  m.route.prefix(settings.routePrefix)
  m.route(document.body, defaultRoute, routeResolver) // m.route(document.querySelector('main'), defaultRoute, routeResolver)
}
