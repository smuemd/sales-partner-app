export function displayEuro (value) {
  return value === undefined ? 'Loading...' : `${value.toLocaleString()} €`
}
