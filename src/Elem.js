class Elem {
  _el = null
  constructor(name, doc) {
    this._create(name, doc)
  }
  _create(name, doc) {
    const spec = 'http://www.w3.org/2000/svg'
    this._el = doc.createElementNS(spec, name)
    return this
  }
  attr(k, v) {
    this._el.setAttribute(k, v)
    return this
  }
  on(name, callback = () => {}) {
    if (typeof callback !== 'function') throw new Error('Elem.on error')
    this._el.addEventListener(name, callback)
    return this
  }
  append(el) {
    this._el.appendChild(el._el)
    return this
  }
  render() {
    return this._el
  }
}

export default Elem
export const elem = (name, doc = document) => new Elem(name, doc)
