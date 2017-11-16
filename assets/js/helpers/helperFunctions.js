import m from 'mithril'

export const decodeBase16 = value => parseInt(value, 16)
export const getFormattedAddress = value => value.substr(0, 10)
export const getEuro = value => (value / 10000000).toFixed(2)
export const currentPage = page => m.route.get().endsWith(page)
export const adminUser = page => m.route.get().includes('admin')
