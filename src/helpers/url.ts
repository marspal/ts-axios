import { isDate, isObject } from "./util";
function encode(val: string): string{

}
export function buildURL(url: string, params?: any): string{
  if(!params){
    return url;
  }
  const parts: string[] = [];
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if(val === null || typeof val === 'undefined'){
      return // 不执行往后代码
    }
    let values = [];
    if(Array.isArray(val)){
      values = val;
      key += '[]'
    } else {
      values = [val];
    }
    values.forEach((val) => {
      if(isDate(val)){
        val = val.toISOString()
      }else if(isObject(val)){
        val = JSON.stringify(val);
      }
      parts.push(`${key}=${val}`)
    })
  });
}
