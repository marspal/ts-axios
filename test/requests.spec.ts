import axios, { AxiosResponse } from '../src'
import { AxiosError } from '../src/helpers/error'
import { getAjaxRequest, TestResponses } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should treat single string arg as url', () => {
    axios('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })
  it('should treat method value as lowercase string', () => {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(resopnse => {
      expect(resopnse.config.method).toBe('post')
      expect(resopnse.data).toEqual(JSON.parse(TestResponses.search.success.responseText))
    })
    return getAjaxRequest().then(resquest => {
      resquest.respondWith(TestResponses.search.success)
    })
  })
  it('should reject on network errors', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })
    jasmine.Ajax.uninstall()
    return axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 404')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))
      jasmine.Ajax.install()
    }
  })
  it('should reject when request timeout', done => {
    let err: AxiosError
    axios('/foo', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })
    return getAjaxRequest().then(request => {
      // @ts-ignore
      request.eventBus.trigger('timeout')
      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })
  it('should reject when validateStatus returns false', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus: status => {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosError | AxiosResponse) {
      expect(rejectSpy).not.toBeCalled()
      expect(resolveSpy).toBeCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).code).toBe(500)
    }
  })
  it('should resolve when validateStatus returns true', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus: status => {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)
    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).toBeCalled()
      expect(rejectSpy).not.toBeCalled()
      expect(reason.config.url).toBe('/foo')
    }
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })
  })
  it('should return JSON when resolved', done => {
    let response: AxiosResponse
    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"errno": 0}'
      })
    })
    setTimeout(() => {
      expect(response.status).toBe(200)
      expect(response.data).toEqual({
        errno: 0
      })
      done()
    }, 100)
  })
  it('should return JSON when rejecting', done => {
    let response: AxiosResponse
    axios('/api/account/signup', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).catch(error => {
      response = error.response
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{"error": "BAD USERNAME", "code": 1}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.error).toBe('BAD USERNAME')
        expect(response.data.code).toBe(1)
        done()
      }, 100)
    })
  })
  it('should supply correct response', done => {
    let response: AxiosResponse
    axios.post('/foo').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })
    })
    setTimeout(() => {
      expect(response.data.foo).toBe('bar')
      expect(response.status).toBe(200)
      expect(response.statusText).toBe('OK')
      expect(response.headers['content-type']).toBe('application/json')
      done()
    }, 100)
  })
  it('should allow overriding Content-Type header case-insensitive', done => {
    let response: AxiosResponse
    axios
      .post(
        '/foo',
        { prop: 'value' },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(res => {
        response = res
      })
    getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json')
      done()
    })
  })
  it('should support array buffer response', done => {
    let response: AxiosResponse
    function str2ab(str: string) {
      const buff = new ArrayBuffer(str.length * 2)
      const view = new Uint16Array(buff)
      for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i)
      }
      return buff
    }
    axios('/foo', {
      responseType: 'arraybuffer'
    }).then(data => {
      response = data
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        // @ts-ignore
        response: str2ab('Hello world')
      })

      setTimeout(() => {
        expect(response.data.byteLength).toBe(22)
        done()
      }, 100)
    })
  })
})
