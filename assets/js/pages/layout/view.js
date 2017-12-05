import m from 'mithril'

export const createView = function (components, pages, fallbackPage) {
  return function (model) {
    const Page = pages[model.page] || fallbackPage // pages.Home  // getOrDefault(layout[model.page])

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
