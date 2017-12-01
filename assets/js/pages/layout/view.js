import m from 'mithril'

export const createView = function (components, pages /* , getOrDefault */) {
  return function (model) {
    const Page = pages[model.page] || pages.Home  // getOrDefault(layout[model.page])

    return [
      m('div#' + model.page.toLowerCase() + '.content',
        components.Header(model),
        Page(model)
      ),
      m('footer',
        components.Footer(model)
      )
    ]
  }
}
