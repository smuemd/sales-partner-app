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
            // TODO: should correspond with :address param ins route /account/:address
            model.params.address
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
              ? '€ ' + model.partnerAccount.haben.toEuro().value
              : vwInlineLoader()
          )
        ]),
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'davon bereits ausgezahlt'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.partnerAccount && model.partnerAccount.soll
              ? '€ ' + model.partnerAccount.soll.toEuro().value
              : vwInlineLoader()
          )
        ]),
        m('dl', { class: 'dib mr4 mt0' }, [
          m('dt', { class: 'f6 db' }, 'saldo'),
          m(
            'dd',
            { class: 'db f2 pl0 ml0 f4 b' },
            model.partnerAccount && model.partnerAccount.saldo
              ? '€ ' + model.partnerAccount.saldo.toEuro().value
              : vwInlineLoader()
          )
        ]),
        m(
          'div.mt2',
          m(
            'dl',
            { class: 'dib mr4 mt0' },
            m(
              'a',
              {
                href: `/account/${model.params.address}/submit`,
                oncreate: m.route.link,
                onupdate: m.route.link,
                class:
                  'f6 link dim br3 ba ph3 pv2 mb2 dib black bg-transparent pointer'
              },
              'Abrechnung starten'
            )
          )
        )
      ])
    ]),
    // TODO: refactor when using no dummy data
    model.partnerAccount &&
    model.partnerAccount.transactions &&
    model.partnerAccount.transactions.length
      ? vwTrsanctions(model)
      : ''
  ]
}
