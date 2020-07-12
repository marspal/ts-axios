// 逻辑上测试headers
import axios from '../src/index'
import { getAjaxRequest } from './helper'
function testHeaderValue(headers: any, key: string, val?: string): void {
  let found = false

  for (let k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}
describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
  it('should use default common headers', () => {
    const headers = axios.defaults.headers.common
    axios('/foo')
    return getAjaxRequest().then(request => {
      for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })
  it('should add extra headers for post', () => {
    axios.post('/foo', 'fizz=buzz')
    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })
  it('should use application/json when posting an object', () => {
    axios.post('/foo/bar', {
      first: 'foo',
      lastName: 'bar'
    })
    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })
  it('should remove content-type id data is mepty', () => {
    axios.post('/foo')
    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })
  it('should preserve content-type if data is false', () => {
    axios.post('/foo', false)

    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })
  it('should remove content-type id data is FormData', () => {
    const data = new FormData()
    data.append('foo', 'bar')
    axios.post('/foo', data)
    return getAjaxRequest().then(request => {
      testHeaderValue(request.requestHeaders, 'Content-Type', undefined)
    })
  })
})
