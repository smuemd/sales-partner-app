'use strict'

import m from 'mithril'

export function vwInlineLoader () {
  return m('div.i.f6.moon-gray', 'Loading...')
}

export function vwPageLoader () {
  return m(
    'div.mw6-ns.center.pt5.f4.moon-gray',
    "Hang on a sec, We're fetching Your Account..."
  )
}
