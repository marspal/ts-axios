import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/util'
import { createError, AxiosError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get',
      headers, responseType, timeout,
      cancelToken, withCredentials,
      xsrfCookieName, xsrfHeaderName
    } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      // 设置响应数据的类型
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    if(withCredentials){
      request.withCredentials = withCredentials;
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
    if((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName){
      const xsrfValue = cookie.read(xsrfCookieName);
      if(xsrfValue && xsrfHeaderName){
        request.setRequestHeader(xsrfHeaderName, xsrfValue)
      }
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        // 删掉content-type
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    if(cancelToken){
      cancelToken.promise.then((reason)=>{
        request.abort();
        reject(reason)
      })
    }
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
