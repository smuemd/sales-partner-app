'use strict'

/**
 *
 * @param model
 * @param actions
 * @param view
 * @returns {*}
 */
function createRouteResolver (model, actions, view) {
  return model.routesDesc.reduce(function (acc, item) {
    acc[item.route] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item.name, params)
        actions.log(item.name, params)
      },
      render: function () {
        return view(model, actions)
      }
    }
    return acc
  }, {})
}

export default createRouteResolver
