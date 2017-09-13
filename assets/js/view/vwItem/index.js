'use strict'

import m from 'mithril'

export default function vwItem (model) {
  return [m('div', 'Account Page - viewing account ' + model.params.id)]
}
