export const createSVGElement = (tagname, attributes = {}) => {
  const spec = 'http://www.w3.org/2000/svg'
  const elem = document.createElementNS(spec, tagname)
  Object.entries(attributes).map(([k, v]) => elem.setAttribute(k, v))
  return elem
}
export const range = () => {}
export const scale = (v, scale) => v * scale
export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
export const splittedBy = (arr = [], fn = (v) => false) => {
  return arr.reduce((a, b) => {
    if (fn(b)) {
      a.push([])
    }
    a[a.length - 1].push(b)
    return a
  }, [])
}
