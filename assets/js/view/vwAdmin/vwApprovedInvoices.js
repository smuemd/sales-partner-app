'use strict'

import m from 'mithril'
import vwCommisionableBillings from '../vwAccount/vwCommisionableBillings'

export default vwApprovedInvoices

// Links are dummy need to update after getting info from Stefan
function vwApprovedInvoices (mdl) {
  let model = mdl
  return m('div.mt5', [
    m(
      'div.cf',
      m('div.fr', [
        m(
          'dl',
          { class: 'dib mr3 mt4 grow' },
          m(
            'a',
            {
              href: '/',
              oncreate: m.route.link,
              onupdate: m.route.link,
              class:
                'mt6 f6 ba b--black-20 bg-blue white mr5 pa2 br2 no-underline'
            },
            'BUCHUNG EXPORTIEREN'
          )
        )
      ])
    ),
    vwCommisionableBillings(model)
  ])
}
