'use strict'
import m from 'mithril'

export const createView = function (actions) {
  return function (model) {
    let defaults = {
      '/item/:id': '/item/42',
      Item: { id: 42 }
    }

    let isActive = (page) => {
      return model.page === page ? '.active' : ''
    }

    return m(
      'ul.nav', model.routesDesc.map(function (item) {
        let href = defaults[item.route] || item.route
        return m(
          'li' + isActive(item.name),
          m(
            'a', { href: href, oncreate: m.route.link }, item.name
          )
        )
      }),
      model.routesDesc.map((item) => {
        let params = defaults[item.name] || {}
        return m(
          'li',
          m(
            'button',
            { onclick: ev => actions.onNavigateTo(item.name, params) },
            item.name
          )
        )
      })
    )
  }
}
