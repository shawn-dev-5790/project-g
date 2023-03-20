import { elem } from './Elem'
import { path } from './Path'
import { scale } from './Scale'

const rects = [1, 2, 3]
const lines = [0, 1, 2, 3, 4]
const viewport = [500, 500]
const xAxisData = [100, 200, 300, 400, 500]
const layout = 500

const init = () => {
  const svg = elem('svg').attr('width', viewport[0]).attr('height', viewport[1])

  const baseline = elem('path')
    .attr('d', path().move().to(0, 450).horizontal(500).close().toString())
    .attr('class', 'baseline')
    .attr('stroke', 'green')

  xAxisData.map((v) => {
    const s = scale().domain(0, 500).range(0, 1).number(v) * layout
    const tick = elem('path')
      .attr('d', path().move().to(s, 450).vertical(10).close().toString())
      .attr('class', 'tick')
      .attr('stroke', 'green')

    svg.append(tick)

    return s
  })

  svg.append(baseline)

  // rects.map((v) => {
  //   const d = path()
  //     .rect(v * 100, v * 100, 100, 100)
  //     .toString()

  //   const rect = elem('path')
  //     .attr('d', d)
  //     .attr('class', 'rect' + v)
  //     .on('mouseover', (e) => e.target.setAttribute('fill', 'red'))
  //     .on('mouseleave', (e) => e.target.setAttribute('fill', 'black'))

  //   svg.append(rect)
  // })

  // lines.map((v) => {
  //   const d = path()
  //     .move()
  //     .to(v * 100, v * 100)
  //     .line()
  //     .to(v * 100 + 100, v * 100 + 100)
  //     .close()
  //     .toString()

  //   const line = elem('path')
  //     .attr('d', d)
  //     .attr('class', 'line' + v)
  //     .attr('stroke', 'green')
  //     .attr('stroke-width', 10)
  //     .on('mouseover', (e) => {
  //       const [m, mx, my, l, lx, ly, z] = e.target.attributes.d.value.split(' ')
  //       const nmx = Number(mx)
  //       const nmy = Number(my)
  //       const nlx = Number(lx)
  //       const nly = Number(ly)
  //       e.target.setAttribute(
  //         'd',
  //         path()
  //           .move()
  //           .to(nmx, nmy)
  //           .line()
  //           .to(nlx, nly + 50)
  //           .close()
  //           .toString()
  //       )
  //     })

  //   svg.append(line)
  // })

  document.getElementById('root').appendChild(svg.render())
}

init()
