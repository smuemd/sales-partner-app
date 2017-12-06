'use strict'
import m from 'mithril'
import { adminUser } from './actions'

export const createView = components => model => {
  let pageName = model.page
  return m('header', { class: 'w-100 bg-white' }, [
    m(
      'div',
      { class: 'db dt-ns mw9 center w-100' },
      m('div', { class: 'db dtc-ns v-mid tl w-50' }, [
        m(
          'a',
          { class: 'dib f5 f4-ns fw6 mt0 mb1 link black-70' },
          'Sev Partner'
        ),
        m('span', { class: 'ml3 f5 ' }, adminUser() ? 'Admin' : 'Account')
      ]),
      components.Nav(model)
    )
  ])
}
