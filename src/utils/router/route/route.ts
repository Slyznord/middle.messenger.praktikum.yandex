import BaseComponent from '../../block/block'
import { render } from '../../renderDOM'
import { props } from './types'
import isEqual from '../../isEqual'

export default class Route {
  private pathname:string
  private readonly blockClass:any
  private block:BaseComponent | null
  private props:props

  constructor(pathname:string, component:BaseComponent, props:props) {
    this.pathname = pathname
    this.blockClass = component
    this.block = null
    this.props = props
  }

  public navigate (pathname:string):void {
    if (this.match(pathname)) {
      this.pathname = pathname
      this.render()
    }
  }

  public leave ():void {
    if (this.block) {
      this.block.hide()
    }
  }

  public match (pathname:string):boolean {
    return isEqual(pathname, this.pathname)
  }

  public render ():void {
    this.block = new this.blockClass()
    render(this.props.rootQuery, this.block)
  }
}