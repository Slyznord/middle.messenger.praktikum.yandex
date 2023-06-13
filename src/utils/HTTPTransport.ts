import { Indexed } from './types'
import { isArrayOrObject, isPlainObject } from './isArray'

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS,
  data?:Indexed,
  params?:Indexed,
  isJSON?:boolean
}

type OptionsWithoutMethod = Omit<Options, 'method'>
type HTTPWithoutOptions = (url:string, options?:OptionsWithoutMethod) => Promise<unknown>
type HTTPMethod = (url:string, options?:Indexed) => Promise<unknown>

class HTTPTransport {
  private readonly baseURL:string

  constructor(baseURL:string) {
    this.baseURL = baseURL
  }

  get:HTTPWithoutOptions = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET })
  }

  post:HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  put:HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  patch:HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PATCH })
  }

  delete:HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }

  private getKey (key: string, parentKey?: string):string {
    return parentKey ? `${parentKey}[${key}]` : key
  }

  private getParams (data: Indexed | [], parentKey?: string) {
    const result: [string, string][] = [];

    for(const [key, value] of Object.entries(data)) {
      if (isArrayOrObject(value)) {
        result.push(...this.getParams(value, this.getKey(key, parentKey)));
      } else {
        result.push([this.getKey(key, parentKey), encodeURIComponent(String(value))]);
      }
    }

    return result;
  }

  private queryStringify (data:Indexed):string {
    if (!isPlainObject(data)) {
      console.error('input must be an object')
    }

    return this.getParams(data).map(arr => arr.join('=')).join('&')
  }

  private request(url:string, options:Options = { method: METHODS.GET, isJSON: true }):Promise<XMLHttpRequest> {
    const { method, data, params = {}, isJSON = true } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, `${this.baseURL}${url}`)

      if (isJSON) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      }

      xhr.withCredentials = true
      xhr.onload = function () {
        if (xhr.status !== 200) {
          reject(xhr.response)
        } else {
          resolve(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send(this.queryStringify(params))
      } else {
        xhr.send((data as unknown as XMLHttpRequestBodyInit))
      }
    })
  }
}

export default HTTPTransport
