import m from 'mithril'

export const createView = (update) => (model) => {
  return m(
    'div',
    m(
      'a[href="https://duckduckgo.com"]', 'external Link to DuckDuckGo'
    )
  )
}
