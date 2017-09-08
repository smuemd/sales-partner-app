'use strict'

import m from 'mithril'

const style = 'overflow-wrap: break-word; white-space: pre-wrap; line-height:1.5;'

export default function vwData (model) {
  return [
    m('small',
      m('pre',
        { style: style },
        model.user
          ? 'User data: ' + JSON.stringify(model.user)
          : 'loading...'
      ),
      m(
        'pre',
        { style: style }, model.partnerAccount.status
          ? model.partnerAccount.status.message === 'loaded'
            ? 'Sales partner account data: ' + JSON.stringify(model.partnerAccount)
            : JSON.stringify(model.partnerAccount.status)
          : 'no sales partner account data loaded.'
      )
    )
  ]
}
