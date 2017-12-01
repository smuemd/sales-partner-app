'use strict'
import m from 'mithril'

// export const createView = actions => model => {
//   const active = page => model.page === page ? ".active" : ''

export const createView = function (components) {
  return function (model) {
    let pageName = model.page
    return m(
      'nav', [
        m(
          'h1',
          { style: 'font-size: 1em;' },
          pageName
        ),
        components.nav(model)
      ]
    )
  }
}
