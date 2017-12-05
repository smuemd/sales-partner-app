import m from 'mithril'

export const createView = (components) => (model) => m(
  'div',
  '<<<<<<<<<Account Page - viewing account ' + model.params.address + '>>>>>>>>>>>',
  components.ExternalLink(model)
)
