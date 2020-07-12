import cookie from '../../src/helpers/cookie'

describe('helpers: cookie', () => {
  it('should read cookies', () => {
    document.cookie = 'bar=baz'
    expect(cookie.read('bar')).toBe('baz')
  })
  it('should return null if cookie name is not exist', () => {
    document.cookie = 'bar=baz'
    expect(cookie.read('foo')).toBeNull()
  })
})
