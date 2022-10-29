import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers: data', () => {
  describe('transformRequest', () => {
    it('should transform request data to string if data is a plainObject', () => {
      expect(transformRequest({ a: 123 })).toBe('{"a":123}')
    })
    it('should do nothing if data is not plainObject', () => {
      const a = new URLSearchParams('a=b&c=d')
      expect(transformRequest(a)).toBe(a)
    })
  })
  describe('transformResponse', () => {
    it('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a": 2}'
      expect(transformResponse(a)).toEqual({ a: 2 })
    })
    it('should do nothing if data is not a JSON string', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })
    it('should do nothing if data is not a JSON string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
