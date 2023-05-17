import Route from '../route/route'
import BaseComponent from '../../block/block'
import { route } from './types'

class Router {
  private static __instance:Router;
  public routes:any[]
  public history:History
  private currentRoute:Route | null
  private readonly rootQuery:string

  constructor(rootQuery: string, routes:any[]) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this.currentRoute = null
    this.rootQuery = rootQuery

    Router.__instance = this

    this.init(routes)
  }

  public use (pathname:string, block:BaseComponent):this {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery })
    this.routes.push(route)
    return this
  }

  public start ():void {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  public go (pathname:string):void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back () {
    this.history.back()
  }

  public forward () {
    this.history.forward()
  }

  private init (routes:{ path:string, component:BaseComponent }[]):void {
    routes.forEach((item:route) => {
      const route = new Route(item.path, item.component, { rootQuery: this.rootQuery })
      this.routes.push(route)
    })
  }

  private _onRoute (pathname:string):void {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this.currentRoute) {
      this.currentRoute.leave()
    }

    this.currentRoute = route
    route.render()
  }

  private getRoute (pathname:string):Route {
    return this.routes.find(route => route.match(pathname))
  }
}

export default Router