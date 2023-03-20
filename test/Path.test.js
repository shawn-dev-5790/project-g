import assert from 'assert'
import { path } from '../src/Path.js'

describe('Path', function () {
  it('should create a new path with an empty string', function () {
    const p = path()
    assert.strictEqual(p.toString(), '')
  })

  it('should add a move command to the path', function () {
    const p = path().move()
    assert.strictEqual(p.toString(), 'M')
  })

  it('should add a line command to the path', function () {
    const p = path().line()
    assert.strictEqual(p.toString(), 'L')
  })

  it('should add a horizontal command to the path', function () {
    const p = path().horizontal(10)
    assert.strictEqual(p.toString(), 'h 10')
  })

  it('should add a vertical command to the path', function () {
    const p = path().vertical(20)
    assert.strictEqual(p.toString(), 'v 20')
  })

  it('should add a close command to the path', function () {
    const p = path().close()
    assert.strictEqual(p.toString(), 'Z')
  })

  it('should add a to command to the path', function () {
    const p = path().to(30, 40)
    assert.strictEqual(p.toString(), '30 40')
  })

  it('should create a rectangle using the rect method', function () {
    const p = path().rect(50, 60, 70, 80)
    assert.strictEqual(p.toString(), 'M 50 60 h 70 v 80 h -70 Z')
  })

  it('should throw an error when updating with a non-function', function () {
    const p = path()
    assert.throws(() => p.update('invalid'), /path.update error/)
  })

  it('should update the path using the update method', function () {
    const p = path()
      .horizontal(50)
      .update((d) => [...d, 'Q'])
      .horizontal(100)
    assert.strictEqual(p.toString(), 'h 50 Q h 100')
  })
})
