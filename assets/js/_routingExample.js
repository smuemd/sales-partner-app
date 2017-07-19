'use strict'
import m from 'mithril'

/**
 * Routing Strategy
 *
 * Routing example with route- and query-params for /fruits and /vegetables routes.
 * With :name and :color as optional route params, and qty in each case as a query param.
 */

// Settings object with routes "/fruits" and "/vegetables" .

window.addEventListener('DOMContentLoaded', main)

// create main() function to set up model, actions and routing
function main (event) {
  console.log('DOM fully loaded and parsed ', event)

  // a slightly more involved settings obj. Now inside the main function
  const settings = {
    paths: [
      { name: 'fruits', route: '/fruits' },
      { name: 'fruits-name', route: '/fruits/:name' },
      { name: 'vegetables', route: '/vegetables' },
      { name: 'vegetables-color', route: '/vegetables/:color' }
    ]
  }
  // set up an initial model and pass settings
  const model = createModel(settings)
  // create actions object
  const actions = createActions(model)
  // set up a route resolver and pass model and actions objects
  const routeResolver = createRouteResolver(model, actions)
  // set a default route
  const defaultRoute = settings.paths[0].route + '?qty=100'

  console.log('route resolver:   ', routeResolver)
  m.route(document.body, defaultRoute, routeResolver)
}

// (1) set up the app model
function createModel (settings) {
  return {
    paths: settings.paths.slice(),
    routeName: undefined,
    params: undefined
  }
}

// (2) set up app actions
function createActions (model) {
  return {
    onNavigateTo: onNavigateTo
  }

  function onNavigateTo (routePattern, params) {
    let routeName = routePattern.split('/')[1]
    model.routeName = routeName
    model.params = params
  }
}

// use m.route() and a RouteResolver, in routeResolver.onmatch (which we can consider "outside input")
// call a method of the actions object (onNavigateTo)
// the actions object will update model ... which will then be rendered by view()
function createRouteResolver (model, actions) {
  return model.paths.reduce(function (acc, item) {
    acc[item.route] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item.route, params)
      },
      render: function () {
        return view(model, actions)
      }
    }

    return acc
  }, {})
}

// create a view app which will display a "FRUITS" or "VEGETABLES" pane
// depending on whether we're on a "/fruits" or "/vegetables" route.
const view = (function () {
  function view (model, actions) {
    return viewApp(model, actions)
  }

  function viewApp (model, actions) {
    return m('.app', [
      viewHeader(model),
      model.routeName === 'fruits' ? viewFruits(model) : viewVegetables(model)
    ])
  }

  function viewHeader (model) {
    let sampleParams = {
      '/fruits/:name': '/fruits/apple',
      '/vegetables/:color': '/vegetables/green'
    }

    return m(
      '.nav',
      model.paths.map(function (item, index) {
        let href =
          (sampleParams[item.route] || '/' + item.name) + '?qty=' + (index + 1)
        return [m('a', { href: href, oncreate: m.route.link }, item.name), ' ']
      })
    )
  }

  function viewFruits (model) {
    return m('.fruits', 'FRUITS', m('code', JSON.stringify(model.params)))
  }

  function viewVegetables (model) {
    return m(
      '.vegetables',
      'VEGETABLES',
      m('code', JSON.stringify(model.params))
    )
  }

  return view
})()
