import BaseComponent from '../../block/block'
// const BaseComponent = require('../../block/block')
import { render } from '../../renderDOM'
import { props } from './types'
import {Indexed} from "../../types";

export default class Route {
  public pathname:string
  private readonly blockClass:Indexed<unknown>
  private block:BaseComponent | null
  private props:props

  constructor(pathname:string, component:Indexed<unknown>, props:props) {
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
    return this.pathname === pathname
  }

  public render ():void {
    // @ts-ignore
    this.block = new this.blockClass()
    render(this.props.rootQuery, (this.block as BaseComponent))
  }
}
