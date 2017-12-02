import m from 'mithril'

export const createView = (components) => (model) => {
  return m(
    'div', [
      components.LoginForm(model),
      components.ExternalLink(model)
    ]
  )
}
