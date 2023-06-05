import { Indexed } from './types'

class EventBus {
  private readonly listeners:Indexed

  constructor() {
    this.listeners = {}
  }

  on (event:string, callback:() => unknown | void):void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off (event:string, callback:() => unknown):void {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter((listener:() => unknown) => listener !== callback)
  }

  emit (event:string, ...args:[]):void {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener:(...args:[]) => unknown) => {
      listener(...args)
    })
  }
}

export default EventBus
