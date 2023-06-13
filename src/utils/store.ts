import EventBus from './event-bus'
import set from './set'
import { State } from './types'

export enum StoreEvents {
  Updated = 'updated'
}


class Store extends EventBus {
  private state:State = {
    chats: null,
    user: null
  }

  public getState ():State {
    return JSON.parse(JSON.stringify(this.state))
  }

  public set (path:string, value:unknown):void {
    set(this.state, path, value)
  }
}

export default new Store()
