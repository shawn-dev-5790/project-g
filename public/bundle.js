(function () {
  'use strict';

  class Elem {
    _el = null
    constructor(name, doc) {
      this._create(name, doc);
    }
    _create(name, doc) {
      const spec = 'http://www.w3.org/2000/svg';
      this._el = doc.createElementNS(spec, name);
      return this
    }
    attr(k, v) {
      this._el.setAttribute(k, v);
      return this
    }
    on(name, callback = () => {}) {
      if (typeof callback !== 'function') throw new Error('Elem.on error')
      this._el.addEventListener(name, callback);
      return this
    }
    append(el) {
      this._el.appendChild(el._el);
      return this
    }
    render() {
      return this._el
    }
  }
  const elem = (name, doc = document) => new Elem(name, doc);

  class Path {
    d = []
    move() {
      this.d.push('M');
      return this
    }
    line() {
      this.d.push('L');
      return this
    }
    horizontal(w) {
      this.d.push('h');
      this.d.push(w);
      return this
    }
    vertical(h) {
      this.d.push('v');
      this.d.push(h);
      return this
    }
    close() {
      this.d.push('Z');
      return this
    }
    to(x, y) {
      this.d.push(x);
      this.d.push(y);
      return this
    }
    rect(x, y, w, h) {
      this.move().to(x, y).horizontal(w).vertical(h).horizontal(-w).close();
      return this
    }
    update(cb) {
      if (typeof cb !== 'function') throw new Error('path.update error')
      this.d = cb(this.d) || this.d;
      return this
    }
    toString() {
      return this.d.join(' ')
    }
  }
  const path = () => new Path();

  const rects = [1, 2, 3];
  const lines = [0, 1, 2, 3, 4];
  const viewport = [500, 500];

  const init = () => {
    const svg = elem('svg').attr('width', viewport[0]).attr('height', viewport[1]);

    rects.map((v) => {
      const d = path()
        .rect(v * 100, v * 100, 100, 100)
        .toString();

      const rect = elem('path')
        .attr('d', d)
        .attr('class', 'rect' + v)
        .on('mouseover', (e) => e.target.setAttribute('fill', 'red'))
        .on('mouseleave', (e) => e.target.setAttribute('fill', 'black'));

      svg.append(rect);
    });

    lines.map((v) => {
      const d = path()
        .move()
        .to(v * 100, v * 100)
        .line()
        .to(v * 100 + 100, v * 100 + 100)
        .close()
        .toString();

      const line = elem('path')
        .attr('d', d)
        .attr('class', 'line' + v)
        .attr('stroke', 'green')
        .attr('stroke-width', 10)
        .on('mouseover', (e) => {
          const [m, mx, my, l, lx, ly, z] = e.target.attributes.d.value.split(' ');
          const nmx = Number(mx);
          const nmy = Number(my);
          const nlx = Number(lx);
          const nly = Number(ly);
          e.target.setAttribute(
            'd',
            path()
              .move()
              .to(nmx, nmy)
              .line()
              .to(nlx, nly + 10)
              .close()
              .toString()
          );
        });

      svg.append(line);
    });

    document.getElementById('root').appendChild(svg.render());
  };

  init();

})();
