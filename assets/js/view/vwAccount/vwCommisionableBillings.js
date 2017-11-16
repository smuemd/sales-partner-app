'use strict'

import m from 'mithril'
import {
  decodeBase16,
  getEuro,
  getFormattedAddress,
  currentPage
} from '../../helpers/helperFunctions'

export default vwCommisionableBillings

function vwCommisionableBillings (mdl) {
  let model = mdl
  const transactions = model.partnerAccount.transactions.slice(-50)
  return m('div.mt5', [
    m('div.overflow-auto', [
      currentPage('submitted')
        ? m(
            'div.mt2',
            m(
              'dl',
              { class: 'dib mr2' },
              m('dt', { class: 'f7 fl b gray pt1' }, 'Provisionsabrechnungen')
            )
          )
        : m('div.cf', [
          m(
              'div',
              { class: 'fl' },
              m('input', {
                class: 'ba  pa2 mb3 mr2',
                type: 'checkbox'
              })
            ),
          m(
              'dt',
              { class: 'f7 fl b gray ml4 pt1' },
              currentPage('in')
                ? 'Eingegangene Provisionsabrechnungen'
                : currentPage('out')
                  ? 'Freigegebene Provisionsabrechnung'
                  : 'Offene Provisionsabrechnungen'
            )
        ]),

      m('table.f6.w-100.center', { cellspacing: '0' }, [
        m('tbody.lh-copy', [
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          m('th.bt.b--black-20'),
          transactions.map(function (transaction) {
            return m('tr', [
              m(
                'td.pv3.pr3.bb.b--black-20',
                m(
                  'dl',
                  { class: 'dib mt0' },
                  m('input', { class: 'db f2 pl0 ml0 f6', type: 'checkbox' })
                )
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m(
                    'dt',
                    { class: 'f6 db dim moon-gray' },
                    currentPage('out')
                      ? 'Von admin:billing'
                      : 'Von partner:entitlement.'
                  ),
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
                    currentPage('out') ? 'An partner:bank' : 'An admin:billing'
                  ),
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
                  m('dt', { class: 'f6 db dim moon-gray' }, 'PDF Rechnung'),
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
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Provisionsbetrag'),
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
