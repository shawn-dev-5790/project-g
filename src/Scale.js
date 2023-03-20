class Scale {
  _value = null
  _domain = [0, 0]
  _range = [0, 1]

  domain(min, max) {
    this._domain = [min, max]
    return this
  }
  range(min, max) {
    this._range = [min, max]
    return this
  }
  number(target) {
    const [min, max] = this._domain
    this._value = (target - min) / (max - min)
    return this._value
  }
}

export default Scale
export const scale = () => new Scale()
