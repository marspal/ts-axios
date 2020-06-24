import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/util'
import { createError, AxiosError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      // 设置响应数据的类型
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleload() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        // 请求出现错误
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        headers: parseHeaders(responseHeaders),
        config,
        request: request,
        status: request.status,
        statusText: request.statusText
      }
      handleResponse(response)
    }
    // 错误处理
    request.onerror = function handleError() {
      // reject(new Error("Network Error"));
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      // reject(new Error(`timeout of ${timeout} ms exceeded`))
      reject(createError('timeout of ${timeout} ms exceeded', config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        // 删掉content-type
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed width status code ${response.status}`))
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
