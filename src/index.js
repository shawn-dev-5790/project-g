// selector - get html root elements
// data
// calc - range, scale,
// component - axis, label, line
// format - text, number, date
// render
// animate
// style

function createSVGElement(tagName, attributes = {}) {
  const spec = 'http://www.w3.org/2000/svg'
  const element = document.createElementNS(spec, tagName)
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
  return element
}
const test = function (el) {
  console.dir(el)
  el.setAttribute('stroke', 'red')
}

class Pipeline {
  constructor(v) {
    this.v = v || {}
  }
  pipe(fn) {
    this.v = fn(this.v)
    return this
  }
  done() {
    console.log(this.v)
    return this
  }
  render() {
    const nodes = this.v
    const root = document.getElementById('root')
    const svg = createSVGElement('svg', { width: c.w, height: c.h })
    const yAxisLine = createSVGElement('path', {
      d: `M 50 ${c.h} V 0`,
      stroke: 'black',
      ['stroke-width']: '10',
      fill: 'transparent',
    })
    svg.appendChild(yAxisLine)
    nodes.map((n) =>
      svg.appendChild(
        createSVGElement('path', {
          ...n,
          d: `M 50 ${n.d} h -10`,
          // onclick: "test(this)",
          onclick: function onClick() {
            console.log('dd')
          },
        })
      )
    )
    root.appendChild(svg)
    return this
  }
}

const range = (min, max, step = 1) => Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step)

const scale = (arr = [], scale = 1) => arr.map((v) => v * scale)
const pathD = (arr = []) => arr.map((v) => ({ d: v }))
const style = (arr = [], attr = {}) => arr.map((v) => ({ ...v, ...attr }))

const c = {
  w: 500,
  h: 300,
  min: 1,
  max: 10,
  style: { stroke: 'black', ['stroke-width']: '10', fill: 'transparent' },
}

const yAxisCreationProcess = new Pipeline()
const yAxis = yAxisCreationProcess
  .pipe((_) => range(1, 10, 2))
  .pipe((v) => scale(v, c.h / 10))
  .pipe((v) => pathD(v))
  .pipe((v) => style(v, c.style))
  .done()
  .render()
