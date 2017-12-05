'use strict'
import m from 'mithril'

export const createView = (components) => (model) => {
  let pageName = model.page
  return m(
    'nav', [
      m(
        'h1',
        { style: 'font-size: 1em;' },
        pageName
      ),
      components.Nav(model)
    ]
  )
}
