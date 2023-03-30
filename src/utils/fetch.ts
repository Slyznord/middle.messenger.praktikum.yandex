enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS,
  data?:any
}

type OptionsWithoutMethod = Omit<Options, 'method'>
type HTTPMethod = (url:string, options?:OptionsWithoutMethod) => Promise<unknown>

class HTTPTransport {
  get:HTTPMethod = (url, options = {}) => {
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

  private queryStringify (data:object):string {
    return Object.entries(data).reduce((sum, [key, value], index) => {
      if (index) sum += '&'

      sum += `${key}=${value}`

      return sum
    }, '?')
  }

  private request(url:string, options:Options = { method: METHODS.GET }):Promise<XMLHttpRequest> {
    const { method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, url)
      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(this.queryStringify(data))
      }
    })
  }
}

export default new HTTPTransport()