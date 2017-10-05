'use strict'

import m from 'mithril'

export default vwInvoice

function vwInvoice (mdl) {
  return [
    m('div.mt2', [
      m(
        'div.mt6',
        m(
          'dl',
          { class: 'dib mr2' },
          m('dt', { class: 'f5 b black-70' }, 'Neue Provisionsabrechnung')
        )
      ),
      m('div.mt2', [
        m(
          'dl',
          { class: 'dib mr2' },
          m('dt', { class: 'f6 b black-70' }, 'Rechnungsemfaenger')
        )
      ]),
      m('form', [
        m('div', { class: 'w-33' }, [
          m('dl', [
            m(
              'dt',
              { class: 'f1 f7-ns moon-gray' },
              'An (extid oder Addresse)'
            ),
            m('input', {
              class: 'mt2  br2 ba b--black-20 pa2 mb2 db w-100',
              type: 'text'
            })
          ])
        ]),

        m(
          'div',
          m('dl', { class: 'dib mr4 mt2' }, [
            m('dt', { class: 'f6 b black-70' }, 'Abrechnungszetraum')
          ])
        ),
        m('div.cf', [
          m('div', { class: 'fl w-20' }, [
            m('dt', { class: 'f1 f7-ns moon-gray mb2' }, 'Anfangsdatum'),
            m('input', {
              class: 'ba br2 b--black-20 pa2 mb3 w-60',
              type: 'date'
            })
          ]),

          m('div', { class: 'fl w-20 ' }, [
            m('dt', { class: 'f1 f7-ns moon-gray mb2' }, 'Enddatum'),
            m('input', {
              class: 'ba br2 b--black-20 pa2 mb3 w-60',
              type: 'date'
            })
          ])
        ]),

        m('div.cf', [
          m(
            'dl',
            { class: 'dib mr4' },
            m(
              'dt',
              { class: 'f6 b black-70' },
              'Errechneter Provisionsanspruch'
            )
          )
        ]),
        m('div.cf', [
          m('div.mr7', [
            m('table.f6.w-100.center', { cellspacing: '0' }, [
              m('tbody.lh-copy', [
                m('th.bt.b--black-20'),
                m('th.bt.b--black-20'),
                m('th.bt.b--black-20'),
                m('tr', [
                  m(
                    'td.pv2.pr3.bb.b--black-20',
                    m('dl', { class: 'dib mt0' }, [
                      m(
                        'dt',
                        { class: 'f6 db dim moon-gray' },
                        'Abrechnungszetraum Vom'
                      ),
                      m('dd', { class: 'db f2 pl0 ml0 f6' }, '01.09.2017')
                    ])
                  ),
                  m(
                    'td.pv2.pr7.bb.b--black-20',
                    m('dl', { class: 'dib  mt0' }, [
                      m('dt', { class: 'f6 db dim moon-gray' }, 'Bis'),
                      m('dd', { class: 'db f2 pl0 ml0 f6' }, '30.09.2017')
                    ])
                  ),
                  m(
                    'td.pv2.pr4.bb.b--black-20',
                    m('dl', { class: 'dib mt0' }, [
                      m(
                        'dt',
                        { class: 'f6 db dim moon-gray' },
                        'Provisionbetrag'
                      ),
                      m('dd', { class: 'db f2 pl0 ml0 f6' }, '€ 50,000')
                    ])
                  )
                ])
              ])
            ]),
            m('table.f6.w-40.fr', { cellspacing: '0' }, [
              m('tbody.lh-copy', [
                m('tr', [
                  m('td.pv3.bb.pr0.b--black-20', 'Ust. 19 %'),
                  m('td.pv3.bb.ml5.b--black-20', '€ 118 867')
                ]),
                m('tr', [
                  m('td.pv3.bb.pr0.b--black-20', 'Summe'),
                  m('td.pv3.bb.ml5.b--black-20', '€ 118 867')
                ])
              ])
            ])
          ])
        ]),
        m(
          'div',
          m('dl', { class: 'dib mr4 mt2' }, [
            m('dt', { class: 'f6 b black-70' }, 'Originalbeleg hinzufuegen')
          ])
        ),
        m('div.cf', [
          m('div', { class: 'fl w-20' }, [
            m('dt', { class: 'f1 f7-ns moon-gray mb2' }, 'Rechnungsnummer'),
            m('input', {
              class: 'ba b--black-20  br2 pa2 mb3 w-60',
              value: 'sp-20170930-01'
            })
          ]),

          m('div.pr1', { class: 'fl ' }, [
            m('dt', { class: 'f1 f7-ns moon-gray mb3' }, 'Originalrechnung'),
            m(
              'label',
              { class: 'ba br2 b--black-20 pa2 mb3 w-60', for: 'file' },
              'DATEI AUSWAEHLEN'
            ),
            m('input', { class: 'o-0 w1 dn', type: 'file', id: 'file' })
          ]),
          m(
            'dt',
            { class: 'f1 f7-ns mt4 moon-gray' },
            'Keine Datei ausgewaehit'
          )
        ]),
        m(
          'div',
          m('dl', { class: 'dib mr4 mt2 black-70' }, [
            m('dt', { class: 'f6 b black-70' }, 'Rechnungbetrag pruefen')
          ])
        ),
        m('div.cf', [
          m('div', { class: 'fl w-10 pa2' }, [
            m('input', {
              class: 'ba  pa2 mb3',
              type: 'checkbox'
            })
          ]),
          m(
            'dt',
            {
              class: 'fl w-30 pa2'
            },
            'Ich bestaetige, dass der von SEV berechnete Provisionsanspruch fuer den oben genannten Zeitraum korrekt ist und exakt dem Forderungsbetrag der von mir erstellten Originalrechnung entspricht.'
          )
        ]),
        m('div.mt5.w100.bt.b--black-20.pt3', [
          m(
            'a',
            {
              href: `#`,
              oncreate: m.route.link,
              onupdate: m.route.link,
              class:
                'mt5 f6 ba b--black-20 bg-blue white mr5  pa2 br2 no-underline'
            },
            'ABBRECHNUNG EINREICHEN'
          ),
          m(
            'a',
            {
              href: `#`,
              oncreate: m.route.link,
              onupdate: m.route.link,
              class: 'f6 blue white pa2 no-underline'
            },
            'ABBRECHEN'
          )
        ])
      ])
    ])
  ]
}
