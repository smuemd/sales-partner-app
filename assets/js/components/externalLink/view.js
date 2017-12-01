import m from 'mithril'

export const createView = (update) => (model) => {
  return m(
    'a[href="https://duckduckgo.com"]', 'eternal Link to DuckDuckGo'
  )
}
