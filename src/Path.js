class Path {
  d = []
  place(x, y) {
    this.d = ['M', x, y]
    return this
  }
  to(x, y) {
    this.d = [...this.d, x, y]
    return this
  }
  line(x, y) {
    this.d = [...this.d, 'L', x, y]
    return this
  }
  rect(w, h) {
    this.d = [...this.d, 'h', w, 'v', h, 'h', -w]
    return this
  }
  close() {
    this.d.push('Z')
    return this
  }
  toString() {
    return this.d.join(' ')
  }
}

function test(min, max, t) {
  let res = 0
  if (min === t) {
    res = 0
  } else if (max === t) {
    res = 1
  } else {
    res = (t - min) / (max - min)
  }

  return 300 * res
}

const scale = (s, v) => v * s
const rate = (target, arr = []) => {
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  return (target - min) / (max - min)
}

const p = new Path()

const populations = [150, 120, 230]
const h = 300
const w = 300

const rect = p.place(0, 0).rect(100, 100).close().toString()
const line = p.place(0, 0).line(100, 100).toString()
const line2 = p
  .place(0, h)
  .line(100, h - scale(h, rate(populations[0], populations)))
  .line(200, h - scale(h, rate(populations[1], populations)))
  .line(300, h - scale(h, rate(populations[2], populations)))
  .toString()

console.log({
  rect,
  line,
  line2,
  pe: test(120, 230, 150),
})
