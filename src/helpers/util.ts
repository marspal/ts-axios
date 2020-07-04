const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })
  return parsed
}
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData;
}
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams;
}
export function extend<T, U>(to: T, from: U): T & U{
  for(const key in from){
    ;(to as T & U)[key] = from[key] as any;
  }
  return to as T & U
}
