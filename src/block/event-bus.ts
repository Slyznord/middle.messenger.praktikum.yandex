class EventBus {
  private readonly listeners:object

  constructor() {
    this.listeners = {}
  }

  on (event, callback):void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off (event, callback):void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
  }

  emit (event, ...args):void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}

export default EventBus