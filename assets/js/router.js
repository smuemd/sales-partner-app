import m from 'mithril'
import pathToRegexp from 'path-to-regexp'

import { settings } from './settings'
import createActions from './actions'

export const createRouter = function (update) {
  const actions = createActions(update)
  const routeResolver = createRouteResolver(settings, actions)
  const routeSync = createRouteSync(settings)
  const stub = document.createElement('div')

  m.route.prefix(settings.routePrefix)
  m.route(stub, settings.defaultRoute, routeResolver)

  return {
    routeSync: routeSync
  }
}

/**
 * createRouteResolver
 * @param settings
 * @param actions
 * @return {*}
 */
function createRouteResolver (settings, actions) {
  const noRender = function () { return null }

  return settings.routesDesc.reduce((acc, item) => {
    acc[item.route] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item.name, params)
      },
      render: noRender
    }
    return acc
  }, {})
}

/**
 * createRouteSync
 * @param settings
 * @return {Function}
 */
function createRouteSync (settings) {
  const name2Route = settings.routesDesc.reduce(
    function (acc, itm) {
      acc[itm.name] = itm.route
      return acc
    }, {}
  )

  const routeCompile = settings.routesDesc.reduce(
    function (acc, itm) {
      acc[itm.route] = pathToRegexp.compile(itm.route)
      return acc
    }, {}
  )

  return function (model) {
    const segment = name2Route[model.page] || settings.defaultRoute
    const route = routeCompile[segment](model.params) + model.query

    if (document.location.hash.substring(1) !== (route)) {
      window.history.pushState({}, '', settings.routePrefix + route)
    }
  }
}
