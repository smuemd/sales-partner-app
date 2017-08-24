'use strict'

import m from 'mithril'

const style = 'overflow-wrap: break-word; white-space: pre-wrap; line-height:1.5;'

export default function vwData (model) {
  return [
    m(
      'pre',
      { style: style },
      model.user
        ? 'User credentials: ' + JSON.stringify(model.user)
        : 'loading...'
    ),
    m(
      'pre',
      { style: style },
      model.data ? 'App data: ' + JSON.stringify(model.data) : 'loading...'
    )
  ]
}
