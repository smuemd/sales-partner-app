'use strict'

import m from 'mithril'
import vwTrsanctions from './vwTransactions'
import { vwInlineLoader } from '../vwHelper'

export default vwAccount

let model

function vwAccount (mdl) {
  model = mdl

  return [
    m('div.pa5.mt10', [
      m(
        'div',
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'Provisionkonto'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.user && model.user.remoteNode
              ? model.user.remoteNode.address
              : 'Loading...'
          )
        ])
      ),
      m('div', [
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'Gesamtprovisionsanspruch'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.partnerAccount && model.partnerAccount.haben
              ? '€ ' + model.partnerAccount.haben.value
              : vwInlineLoader()
          )
        ]),
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'davon bereits ausgezahlt'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.partnerAccount && model.partnerAccount.soll
              ? '€ ' + model.partnerAccount.soll.value
              : vwInlineLoader()
          )
        ]),
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'saldo'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.partnerAccount && model.partnerAccount.saldo
              ? '€ ' + model.partnerAccount.saldo.value
              : vwInlineLoader()
          )
        ]),
        m(
          'div.mt2',
          m(
            'dl',
            { class: 'dib mr4 mt0' },
            m(
              'button',
              {
                class:
                  'f6 link dim br3 ba ph3 pv2 mb2 dib black bg-transparent pointer'
              },
              'Abrechnung starten'
            )
          )
        )
      ])
    ]),
    model.partnerAccount &&
    model.partnerAccount.transactions &&
    model.partnerAccount.transactions.length
      ? vwTrsanctions()
      : vwTrsanctions()
  ]
}
