'use strict'
import m from 'mithril'

export const createView = function (components) {
  return function (model) {
    return m(
      'div', [
        'Home Page',
        ' | ',
        components.ExternalLink(model)
      ]
    )
  }
}
