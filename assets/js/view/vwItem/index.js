'use strict'

import m from 'mithril'

export default function vwItem (model) {
  return [m('div', 'Item Page - viewing item ' + model.params.id)]
}
