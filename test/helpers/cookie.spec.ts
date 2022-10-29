import cookie from '../../src/helpers/cookie'
describe('helper:cookie', () => {
  it('should read cookie', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })
  it('should be return null if cookie is not exists', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('baz')).toBeNull()
  })
})
