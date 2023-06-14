import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import HTTPTransport from './HTTPTransport'
import { expect } from 'chai'

describe('Проверяем рабоут класса HTTPTransport', () => {
  let xhr:SinonFakeXMLHttpRequestStatic
  let instance:HTTPTransport
  const requests:SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // @ts-ignore
    global.XMLHttpRequest = xhr

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    })

    instance = new HTTPTransport('/auth')
  })

  afterEach(() => {
    requests.length = 0
  })

  it('Метод GET должен возвращать method = GET', () => {
    instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('GET')
  })

  it('Метод POST должен возвращать method = POST', () => {
    instance.post('/user')

    const [request] = requests

    expect(request.method).to.eq('POST')
  })

  it('Метод PUT должен возвращать method = PUT', () => {
    instance.put('/user')

    const [request] = requests

    expect(request.method).to.eq('PUT')
  })

  it('Метод DELETE должен возвращать method = DELETE', () => {
    instance.delete('/user')

    const [request] = requests

    expect(request.method).to.eq('DELETE')
  })
})
