'use strict'

import m from 'mithril'
import vwReceivedInvoices from './vwReceivedInvoices'
import vwApprovedInvoices from './vwApprovedInvoices'
import vwOpenCommisionStatements from './vwOpenCommisionStatements'
import { vwInlineLoader } from '../vwHelper'
import { currentPage } from '../../helpers/helperFunctions'

export default vwAdmin

let model

function vwAdmin (mdl) {
  model = mdl
  return [
    m('div.mt6', [
      m('div', [
        m(
          'a',
          {
            class:
              'no-underline dib pr2 pl2 ml2 mt0 mr2 black ' +
              (currentPage('in') ? 'br bl b--black-10 ' : 'silver pointer'),
            href: `/admin/${model.params.address}/in`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6 mr5 db' }, 'Rechnungseingang'),
            m(
              'dd',
              {
                class:
                  'db pl0 ml0 mt3' +
                  (currentPage('in') ? ' bb pb2 bw2 b--blue' : '')
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
              'no-underline dib pr2 pl2 ml2 mt0 mr2 black ' +
              (currentPage('out') ? 'br bl b--black-10 ' : 'silver pointer'),
            href: `/admin/${model.params.address}/out`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6 mr5 db' }, 'Freigegebene Rechnungen'),
            m(
              'dd',
              {
                class:
                  'db pl0 ml0 mt3' +
                  (currentPage('out') ? ' bb pb2 bw2 b--blue' : '')
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
            href: `/admin/${model.params.address}/open`,
            oncreate: m.route.link,
            onupdate: m.route.link
          },
          [
            m('dt', { class: 'f6  mr5db' }, 'Offene Rechnungen'),
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
        )
      ])
    ]),

    // TODO: Logic Needs to be changed after geting the actions, currently hardcoded with transactions
    model.partnerAccount &&
    model.partnerAccount.transactions &&
    model.partnerAccount.transactions.length
      ? currentPage('in')
        ? vwReceivedInvoices(model)
        : currentPage('out')
          ? vwApprovedInvoices(model)
          : vwOpenCommisionStatements(model)
      : ''
  ]
}
