import { getRandomInt, scale, createSVGElement } from './utils.js'

export class Axis {
  values = []

  data(values) {
    this.values = values
    return this
  }
  scale(s) {
    this.values = this.values.map((v) => scale(v, s))
    return this
  }
  render(svg) {
    this.values.map((d) => {
      svg.appendChild(
        createSVGElement('path', {
          d: `M 10 ${d} L 100 ${getRandomInt(50, 100)}`,
          stroke: 'black',
          onclick: '_onClickPath(this)',
        })
      )
    })
    return this
  }
}
