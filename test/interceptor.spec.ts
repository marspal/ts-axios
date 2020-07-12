import axios, { AxiosRequestConfig, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'

describe('interceptors', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
  it('should add a request interceptor', () => {
    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.headers.test = 'added by interceptor'
      return config
    })
    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test).toBe('added by interceptor')
    })
  })
})
