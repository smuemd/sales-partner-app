import m from 'mithril'

export const createView = (components) => (model) => m(
  'div',
  'Item Page - viewing Item' + model.params.id,
  ' | ',
  components.ExternalLink(model)
)
