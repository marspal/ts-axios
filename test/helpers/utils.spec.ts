import {
  extend,
  isDate,
  isFormData,
  isPlainObject,
  isURLSearchParams,
  deepMerge
} from '../../src/helpers/util'

describe('helper:util', () => {
  describe('isXX', () => {
    it('should validate date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    it('should validate plain object', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
    it('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
      expect(isFormData(new Date())).toBeFalsy()
    })
    it('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('a=12&b=123')).toBeFalsy()
    })
  })
  describe('extend', () => {
    it('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }
      extend(a, b)
      expect(a.foo).toBe(123)
    })
    it('should extend properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      extend(a, b)
      expect(a.foo).toBe(123)
      expect(a.bar).toBe(789)
    })
  })
  describe('deepMerge', () => {
    it('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }
      deepMerge(a, b, c)

      expect(a.foo).toBeUndefined()
      expect(a.bar).toBeUndefined()
      expect(b.bar).toBeUndefined()
      expect(c.foo).toBeUndefined()
    })
    it('should deepMerge properties', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })
    it('should deepMerge recursively', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)
      expect(c).toEqual({
        foo: { bar: 123, baz: 456 },
        bar: { qux: 789 }
      })
    })
    it('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)
      expect(c).toEqual(a)
      expect(c).not.toBe(a)
      expect(a.foo).not.toBe(c.foo)
    })
    it('should handle null and undefind arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
