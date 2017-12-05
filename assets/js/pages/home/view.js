import m from 'mithril'

export const createView = (components) => (model) => {
  return m(
    'div',
    '<<<<<<< Home Page >>>>>>>>>>',
    components.ExternalLink(model)
  )
}
