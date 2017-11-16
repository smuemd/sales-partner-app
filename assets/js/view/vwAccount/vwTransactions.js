'use strict'

import m from 'mithril'
import {
  decodeBase16,
  getEuro,
  getFormattedAddress
} from '../../helpers/helperFunctions'
export default vwTrsanctions

function vwTrsanctions (mdl) {
  let model = mdl
  const transactions = model.partnerAccount.transactions.slice(-50)
  return m('div.mt5', [
    m('div.overflow-auto', [
      m(
        'div.mt2',
        m(
          'dl',
          { class: 'dib mr2' },
          m('dt', { class: 'f7 b gray' }, 'Rechnungsemfaenger')
        )
      ),

      m('table.f6.w-100.center', { cellspacing: '0' }, [
        m('tbody.lh-copy', [
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          transactions.map(function (transaction) {
            return m('tr', [
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Blocknr.'),
                  m(
                    'dd',
                    { class: 'db f2 pl0 ml0 f6' },
                    transaction.blockNumber
                  )
                ])
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Von admin:calc'),
                  m(
                    'a',
                    { class: 'db f2 pl0 ml0 f6 blue', href: '/' },
                    getFormattedAddress(transaction.from)
                  )
                ])
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m(
                    'dt',
                    { class: 'f6 db dim moon-gray' },
                    'An partner:entitlement'
                  ),
                  m(
                    'dd',
                    { class: 'db f2 pl0 ml0 f6' },
                    getFormattedAddress(transaction.to)
                  )
                ])
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Betrag'),
                  m(
                    'dd',
                    { class: 'db f2 pl0 ml0 f6' },
                    '€ ' + getEuro(decodeBase16(transaction.value))
                  )
                ])
              )
            ])
          })
        ])
      ])
    ])
  ])
}
