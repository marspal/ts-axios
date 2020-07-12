import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers: error', () => {
  it('should create an Error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      data: { foo: 'bar' },
      config
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.code).toBe('SOMETHING')
    expect(error.config).toBe(config)
    expect(error.isAxiosError).toBeTruthy()
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
  })
})
