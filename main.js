import { createSVGElement } from './src/utils.js'
import { Axis } from './src/Axis.js'
import { splittedBy } from './src/utils.js'

const config = {
  vw: 300, // viewport width
  vh: 300, // viewport height
  scale: 1,
}

// execute - init
const init = () => {
  const ctx = createSVGElement('svg', { width: config.vw, height: config.vh })

  const xAxis = new Axis()
  const yAxis = new Axis()

  const years = Array.from({ length: 20 }, (_, i) => 1900 + i * 10)

  console.log({
    years,
    min: Math.min(...years),
    max: Math.max(...years),
    splittedBy: splittedBy(years, (v) => v % 100 === 0),
  })

  xAxis.data(years).scale(1).render(ctx)

  document.getElementById('root').appendChild(ctx)
}

init()
