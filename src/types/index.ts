import { isPlainObject } from "../helpers/util";

export type Method =
  | 'get'
  | 'GET'
  | 'head'
  | 'HEAD'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'

// axios中的公共方法
export interface Axios{
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManger<AxiosRequestConfig>,
    response: AxiosInterceptorManger<AxiosResponse>
  };
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInstance extends Axios{
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [proName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface AxiosInterceptorManger<T> {
  use(resolved: ResolvedFn<T>, reject?: RejectedFn): number;
  eject(id: number): void;
}
export interface ResolvedFn<T>{
  (val: T): T | Promise<T>
}

export interface RejectedFn{
  (error: any): any
}


export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if(obj){
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if(isPlainObject(val)){
          if(isPlainObject(result[key])){
            result[key] = deepMerge(result[key], val)
          }else{
            result[key] = deepMerge(val);
          }
        }else{
          result[key] = val;
        }
      })
    }
  })
  return result;
}
