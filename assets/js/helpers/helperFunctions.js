export const decodeBase16 = value => parseInt(value, 16)
export const getFormattedAddress = value => value.substr(0, 10)
export const getEuro = value => value / 10000000000000
