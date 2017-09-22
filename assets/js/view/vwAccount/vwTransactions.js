'use strict'

import m from 'mithril'

export default vwTrsanctions

let model

function vwTrsanctions (mdl) {
  model = mdl

  // dummy transactions
  let transactions = [
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0123'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0124'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0125'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0126'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0127'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0128'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0129'
    },
    {
      block: '110398',
      time: '30.09.2017. 15:38:49',
      von: 'oxxasweoxxxxxxxssss',
      an: 'anxxser77778dsa87383',
      betrag: '0.0131'
    }
  ]

  return m('div.mt5', [
    m('div.overflow-auto', [
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
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Block'),
                  m('dd', { class: 'db f2 pl0 ml0 f6' }, transaction.block)
                ])
              ),
              m('td.pv3.pr3.bb.b--black-20', transaction.time),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Von'),
                  m('dd', { class: 'db f2 pl0 ml0 f6' }, transaction.von)
                ])
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'An'),
                  m('dd', { class: 'db f2 pl0 ml0 f6' }, transaction.an)
                ])
              ),
              m(
                'td.pv3.pr3.bb.b--black-20',
                m('dl', { class: 'dib mr4 mt0' }, [
                  m('dt', { class: 'f6 db dim moon-gray' }, 'Betrag'),
                  m(
                    'dd',
                    { class: 'db f2 pl0 ml0 f6' },
                    '€ ' + transaction.betrag
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
