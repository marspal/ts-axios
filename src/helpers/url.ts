import { isDate, isPlainObject } from './util'
interface URLOrigin {
  protocol: string;
  host: string;
}
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/g, ']')
}
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return // 不执行往后代码
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
      // parts.push(`${key}=${val}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
  }
  return url
}

export function isURLSameOrigin(requestURL: string): boolean{
  const parsedOrigin = resolveURL(requestURL);
  return (parsedOrigin.host === currentOrigin.host
    && currentOrigin.protocol === parsedOrigin.protocol)
}

const usrParsingNode = document.createElement('a');
const currentOrigin = resolveURL(document.location.href);
function resolveURL(url: string): URLOrigin{
  usrParsingNode.setAttribute("href", url);
  const {protocol, host} = usrParsingNode;
  return {protocol, host}
}
