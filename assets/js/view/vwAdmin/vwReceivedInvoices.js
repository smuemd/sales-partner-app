'use strict'

import m from 'mithril'
import vwCommisionableBillings from '../vwAccount/vwCommisionableBillings'
import { currentPage } from '../../helpers/helperFunctions'

export default vwReceivedInvoices

// Links are dummy need to update after getting info from Stefan
function vwReceivedInvoices (mdl) {
  let model = mdl
  return m('div.mt5', [
    m(
      'div.cf',
      m('div.fr', [
        m(
          'dl',
          { class: 'dib mt4 mr3 grow' },
          m(
            'a',
            {
              href: '/',
              oncreate: m.route.link,
              onupdate: m.route.link,
              class:
                'f6 link dim br2 ba ph3 pv2 mb2 dib blue bg-transparent pointer no-underline'
            },
            'NEUER ORIGINALBELEG'
          )
        ),
        m(
          'dl',
          { class: 'dib mr3 mt4 grow' },
          m(
            'a',
            {
              href: currentPage('submitted')
                ? `/account/${model.params.address}/submit`
                : '/',
              oncreate: m.route.link,
              onupdate: m.route.link,
              class:
                'f6 link dim br2 ba ph3 pv2 mb2 dib blue bg-transparent pointer no-underline'
            },
            'RECHNUNG ZURUECKWISEN'
          )
        ),
        m(
          'dl',
          { class: 'dib mr3 mt4 grow' },
          m(
            'a',
            {
              href: currentPage('submitted')
                ? `/account/${model.params.address}/submit`
                : '/',
              oncreate: m.route.link,
              onupdate: m.route.link,
              class:
                'mt6 f6 ba b--black-20 bg-blue white mr5 pa2 br2 no-underline'
            },
            'FREIGABE & EXPORT'
          )
        )
      ])
    ),
    vwCommisionableBillings(model)
  ])
}
