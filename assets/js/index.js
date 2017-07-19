'use strict'
import m from 'mithril'

/**
 * Routing Strategy
 *
 * represent changes in the route as changes in the model...
 * ...then continue as before by using that model to render a view.
 */

// Settings object with routes "/fruits" and "/vegetables" .
const settings = {
  paths : ['fruits', 'vegetables']
}

window.addEventListener("DOMContentLoaded", main)

function main (event) {
  console.log('DOM fully loaded and parsed ', event)

  // (1) set up an initial model and pass settings
  const model = createModel(settings)
  // (2) create actions object
  const actions = createActions(model)
  // (3) set up a route resolver and pass model and actions objects
  const routeResolver = createRouteResolver(model, actions)
  const defaultRoute = '/' + settings.paths[0]

  m.route(document.body, defaultRoute, routeResolver)
}

function createModel (settings) {
  return {
    paths: settings.paths.slice(),
    routeName: undefined
  }
}

function createActions (model) {
  return {
    onNavigateTo: onNavigateTo
  }

  function onNavigateTo (routeName, params) {
    model.routeName = routeName
  }
}

// use m.route() and a RouteResolver, in routeResolver.onmatch (which we can consider "outside input")
// call a method of the actions object (onNavigateTo)
// the actions object will update model ... which will then be rendered by view()
function createRouteResolver (model, actions) {
  return model.paths.reduce(function (acc, item) {
    acc['/' + item] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item, params)
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
    return m('.nav',
      model.paths.map(function (item) {
        return [
          m('a', { href: '/' + item, oncreate: m.route.link }, item),
          ' '
        ]
      })
    )
  }

  function viewFruits (model) {
    return m('.fruits', 'FRUITS')
  }

  function viewVegetables (model) {
    return m('.vegetables', 'VEGETABLES')
  }

  return view
})()
