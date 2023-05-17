import EventBus from './event-bus'
import set from './set'

export enum StoreEvents {
  Updated = 'updated'
}


class Store extends EventBus {
  private state:any = {
    user: null
  }

  public getState ():object {
    return JSON.parse(JSON.stringify(this.state))
  }

  public set (path:string, value:unknown):void {
    set(this.state, path, value)
  }
}

export default new Store()
