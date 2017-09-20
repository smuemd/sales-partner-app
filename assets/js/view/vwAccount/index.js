'use strict'

import m from 'mithril'

export default vwAccount

let model

function vwAccount (mdl) {
  model = mdl
  return m('div.pa5', [
    m(
      'div',
      m('dl', { class: 'dib mr4 mt0' }, [
        m('dt', { class: 'f6 db' }, 'Provisionkonto'),
        m('dd', { class: 'db f2 pl0 ml0 f4 b' }, model.user.remoteNode.address)
      ])
    ),
    m('div', [
      m('dl', { class: 'dib mr4 mt0' }, [
        m('dt', { class: 'f6 db' }, 'Gesamtprovisionsanspruch'),
        m(
          'dd',
          { class: 'db f2 pl0 ml0 f4 b' },
          '€ ' + JSON.stringify(model.partnerAccount.haben.value)
        )
      ]),
      m('dl', { class: 'dib mr4 mt0' }, [
        m('dt', { class: 'f6 db' }, 'davon bereits ausgezahlt'),
        m(
          'dd',
          { class: 'db f2 pl0 ml0 f4 b' },
          '€ ' + JSON.stringify(model.partnerAccount.soll.value)
        )
      ]),
      m('dl', { class: 'dib mr4 mt0' }, [
        m('dt', { class: 'f6 db' }, 'saldo'),
        m(
          'dd',
          { class: 'db f2 pl0 ml0 f4 b' },
          '€ ' + JSON.stringify(model.partnerAccount.saldo.value)
        )
      ])
    ])
  ])
}
