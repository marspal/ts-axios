import { request } from 'http'
import axios, { AxiosResponse } from '../src'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
  it('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })
  it('should make a http request', () => {
    const instance = axios.create()
    instance.get('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })
  it('should make a post request', () => {
    const instance = axios.create()
    instance.post('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })
  it('should make a put request', () => {
    const instance = axios.create()
    instance.put('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
      expect(request.url).toBe('/foo')
    })
  })
  it('should make a patch request', () => {
    const instance = axios.create()
    instance.patch('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })
  it('should make a options request', () => {
    const instance = axios.create()
    instance.options('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })
  it('should make a delete request', () => {
    const instance = axios.create()
    instance.delete('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })
  it('should make a head request', () => {
    const instance = axios.create()
    instance.head('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })
  it('should use instance options', () => {
    const instance = axios.create({ timeout: 1000 })
    instance.delete('/foo')
    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })
  it('should have defaults headers', () => {
    const instance = axios.create()
    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })
  it('should have interceptors on the instance', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })
    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: AxiosResponse
    instance.get('/foo').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
      setTimeout(() => {
        expect(response.config.timeout).toBe(0)
        expect(response.config.withCredentials).toBeTruthy()
        expect(response.status).toBe(200)
        done()
      }, 100)
    })
  })
})
