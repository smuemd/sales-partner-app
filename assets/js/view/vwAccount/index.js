'use strict'

import m from 'mithril'
import vwTrsanctions from './vwTransactions'
import vwCommisionableBillings from './vwCommisionableBillings'
import { vwInlineLoader } from '../vwHelper'
import { currentPage } from '../../helpers/helperFunctions'

export default vwAccount

let model

function vwAccount (mdl) {
  model = mdl
  return [
    m('div.mt6', [
      m('div', [
        m(
          'a',
          {
            class:
              'no-underline dib pr2  pl2 ml2 mt0 mr2 black ' +
              (currentPage('total') ? 'br bl b--black-10 ' : 'silver pointer'),
            href: `/account/${model.params.address}/total`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6 mr5 db' }, 'Provisionsanspruch'),
            m(
              'dd',
              {
                class:
                  'db pl0 ml0 mt3' +
                  (currentPage('total') ? ' bb pb2 bw2 b--blue' : '')
              },
              model.partnerAccount && model.partnerAccount.haben
                ? '€ ' + model.partnerAccount.haben.toEuro().value
                : vwInlineLoader()
            )
          ]
        ),
        m(
          'a',
          {
            class:
              'no-underline dib pr2 pl2 ml2  mt0 mr2 black ' +
              (currentPage('submitted')
                ? 'br bl b--black-10 '
                : 'silver pointer'),
            href: `/account/${model.params.address}/submitted`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6 mr5 db' }, 'Bereits abgerechnet'),
            m(
              'dd',
              {
                class:
                  'db pl0 ml0 mt3' +
                  (currentPage('submitted') ? ' bb pb2 bw2 b--blue' : '')
              },
              model.partnerAccount && model.partnerAccount.soll
                ? '€ ' + model.partnerAccount.soll.toEuro().value
                : vwInlineLoader()
            )
          ]
        ),
        m(
          'a',
          {
            class:
              'no-underline dib pr2 pl2 ml2 mt0 ml2 black ' +
              (currentPage('open') ? 'bl br b--black-10 ' : 'silver pointer'),
            href: `/account/${model.params.address}/open`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6  mr5db' }, 'Nicht abgerechnet'),
            m(
              'dd',
              {
                class:
                  'db pl0 ml0 mt3' +
                  (currentPage('open') ? ' bb pb2 bw2 b--blue' : '')
              },
              model.partnerAccount && model.partnerAccount.saldo
                ? '€ ' + model.partnerAccount.saldo.toEuro().value
                : vwInlineLoader()
            )
          ]
        ),
        m(
          'div.mt2.fr',
          m(
            'dl',
            { class: 'dib mr4 mt4 grow' },
            m(
              'a',
              {
                href: currentPage('submitted')
                  ? `/account/${model.params.address}/submit`
                  : '/',
                oncreate: m.route.link,
                onupdate: m.route.link,
                class: currentPage('submitted')
                  ? 'f6 link dim br2 ba ph3 pv2 mb2 dib blue bg-transparent pointer no-underline'
                  : 'mt6 f6 ba b--black-20 bg-blue white mr5 pa2 br2 no-underline'
              },
              currentPage('submitted')
                ? 'NEUER ORIGINALBELEG'
                : 'Abrechnung starten'
            )
          )
        )
      ])
    ]),
    // TODO: refactor when using no dummy data
    model.partnerAccount &&
    model.partnerAccount.transactions &&
    model.partnerAccount.transactions.length
      ? currentPage('submitted')
        ? vwCommisionableBillings(model)
        : vwTrsanctions(model)
      : ''
  ]
}
