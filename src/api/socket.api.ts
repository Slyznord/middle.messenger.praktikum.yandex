import EventBus from '../utils/event-bus'

type messageData = {
  type: string,
  content?:string
}

export default class Socket {
  public static EVENTS = {
    FLOW_SDO: 'flow:socket-did-open',
    FLOW_SGM: 'flow:socket-get-message'
  }

  private ws:WebSocket
  private readonly pingId:number
  public eventBus

  constructor(url:string) {
    const eventBus = new EventBus()

    this.ws = new WebSocket(url)
    this.eventBus = () => eventBus

    this.ws.addEventListener('open', this.onOpen.bind(this))
    this.ws.addEventListener('close', this.onClose.bind(this))
    this.ws.addEventListener('message', this.onMessage.bind(this))
    this.ws.addEventListener('error', this.onError.bind(this))

    this.pingId = setInterval(this.ping.bind(this), 5000)
  }

  private ping () {
    this.send({
      type: 'ping'
    })
  }

  protected onOpen() {
    this.eventBus().emit(Socket.EVENTS.FLOW_SDO)
    console.log('Соединение установлено')
  }

  protected onClose (event:CloseEvent) {
    clearInterval(this.pingId)

    if (event.wasClean) {
      console.log('Соединение закрыто чисто')
    } else {
      console.log('Обрыв соединения')
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`)
  }

  protected onMessage (event:MessageEvent) {
    this.eventBus().emit(Socket.EVENTS.FLOW_SGM, JSON.parse(event.data))
    console.log(`Message: ${event.data}`)
  }

  protected onError (event:ErrorEvent) {
    console.error(event.message)
  }

  public send (data:messageData) {
    this.ws.send(JSON.stringify(data))
  }

  public close () {
    this.ws.close(1000, '')
  }
}
