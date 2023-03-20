class Path {
  d = []
  move() {
    this.d.push('M')
    return this
  }
  line() {
    this.d.push('L')
    return this
  }
  horizontal(w) {
    this.d.push('h')
    this.d.push(w)
    return this
  }
  vertical(h) {
    this.d.push('v')
    this.d.push(h)
    return this
  }
  close() {
    this.d.push('Z')
    return this
  }
  to(x, y) {
    this.d.push(x)
    this.d.push(y)
    return this
  }
  rect(x, y, w, h) {
    this.move().to(x, y).horizontal(w).vertical(h).horizontal(-w).close()
    return this
  }
  update(cb) {
    if (typeof cb !== 'function') throw new Error('path.update error')
    this.d = cb(this.d) || this.d
    return this
  }
  toString() {
    return this.d.join(' ')
  }
}
export default Path
export const path = () => new Path()
