import { transformRequest, transformResponse } from '../../src/helpers/data'
describe('helpers: data', () => {
  describe('transformRequest', () => {
    it('should transform request data to string if data is a plainObject', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })
    it('should do nothing if data is not a PlainObject', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })
  describe('transformResponse', () => {
    // json string属性需要加引号
    it('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a": 1}'
      expect(transformResponse(a)).toEqual({ a: 1 })
    })
    it('should do nothing if data is a string but not a JSON string', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })
    it('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
