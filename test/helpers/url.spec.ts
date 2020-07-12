import { buildURL, combineURL, isAbsoluteURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers: url', () => {
  describe('buildUrl', () => {
    it('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })
    it('should support params', () => {
      expect(buildURL('/foo', { foo: 'bar' })).toBe('/foo?foo=bar')
    })
    it('shuld ignore if some params value is null', () => {
      const params = { foo: 'bar', bar: null }
      expect(buildURL('/foo', params)).toBe('/foo?foo=bar')
    })
    it('should ignore if the only param value is null', () => {
      expect(buildURL('/bar', { foo: null })).toBe('/bar')
    })
    it('should support object params', () => {
      expect(buildURL('/bar', { foo: { bar: 'foo' } })).toBe(
        '/bar?foo=' + encodeURI('{"bar":"foo"}')
      )
    })
    it('should support date params', () => {
      const date = new Date()
      expect(
        buildURL('/bar', {
          date
        })
      ).toBe('/bar?date=' + date.toISOString())
    })
    it('should support array params', () => {
      expect(
        buildURL('/bar', {
          foo: ['bar', 'baz']
        })
      ).toBe('/bar?foo[]=bar&foo[]=baz')
    })
    it('should support special params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, []'
        })
      ).toBe('/foo?foo=' + '@:$,+[]')
    })
    it('should support existing params', () => {
      expect(
        buildURL('/bar?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/bar?foo=bar&bar=baz')
    })
    it('should correct discard url hash mark', () => {
      expect(
        buildURL('/bar?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/bar?foo=bar&query=baz')
    })
    it('should support URLSearchParams', () => {
      expect(buildURL('/bar', new URLSearchParams('a=b&c=d'))).toBe('/bar?a=b&c=d')
    })
    it('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar1'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar1')
      expect(serializer).toBeCalled()
      expect(serializer).toBeCalledWith(params)
    })
    it('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })
  describe('combineURL', () => {
    it('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    it('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    it('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    it('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    it('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })
  describe('isAbsoluteURL', () => {
    it('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    it('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    it('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
    it('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })
  })
  describe('isURLSameOrigin', () => {
    it('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })
    it('should detect different origin ', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
