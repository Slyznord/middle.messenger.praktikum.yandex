import EventBus from '../event-bus'
import { v4 } from 'uuid'
import * as Handlebars from 'handlebars'
import { Props } from './types'
import { Indexed } from '../types'
import { isEqual } from '../isEqual'

class BaseComponent {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:components-did-mount',
    FLOW_CDU: 'flow:components-did-update',
    FLOW_RENDER: 'flow:render'
  }

  protected element:HTMLElement
  protected children:Indexed
  private readonly meta:{ tagName:string, props:object }
  private readonly id:string

  public props:Indexed
  protected eventBus

  constructor(tagName = 'div', propsAndChildren:object = { settings: {} }) {
    const { children, props } = this._getChildren(propsAndChildren)
    const eventBus = new EventBus()

    this.id = v4()
    this.children = children
    this.meta = { tagName, props }
    this.props = this._makePropsProxy({ ...props, id: this.id })
    this.eventBus = () => eventBus

    this.registerEvents(eventBus)
    eventBus.emit(BaseComponent.EVENTS.INIT)
  }

  private registerEvents (eventBus:EventBus):void {
    eventBus.on(BaseComponent.EVENTS.INIT, this._init.bind(this))
    eventBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  private _init ():void {
    this._createResources()
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER)
  }

  private _createResources ():void {
    const { tagName } = this.meta
    this.element = this._createDocumentElement(tagName)
  }

  private _addParentClass ():void {
    const { wrapperClasses = null } = this.props

    if (wrapperClasses) {
      wrapperClasses.split(' ').forEach((item:string) => { this.element.classList.add(item) })
    }
  }

  private _createDocumentElement (tagName:string):HTMLElement {
    const element = document.createElement(tagName)

    if (this.props.settings?.withInternalID) {
      element.setAttribute('data-id', this.id)
    }

    return element
  }

  private _makePropsProxy (props:object):Props {
    const self = this

    return new Proxy(props, {
      set (target:Props, prop:string, value) {
        if (prop.indexOf('_') === 0) {
          console.error('Отказано в доступе')
        }

        const oldProps = JSON.parse(JSON.stringify(target))

        if (target[prop as keyof typeof target] !== value) {
          target[prop as keyof typeof target] = value;
          self.eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, oldProps, target)
          return true
        }

        return true
      }
    })
  }

  private _render ():void {
    const block = this.render()

    if (block === null) return

    this.element.innerHTML = ''
    this.element.appendChild(block)

    this._addParentClass()
    this._addEvents()

    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM)
  }

  private _componentDidMount ():void {
    this.componentDidMount();
  }

  private _componentDidUpdate (oldProps:Props, newProps:Props):void {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this._render()
    }
  }

  private _addEvents ():void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      const element = this.element.querySelector(`[${eventName}]`) || this.element
      element.addEventListener(eventName, events[eventName as keyof typeof events])
    })
  }

  private _removeEvents ():void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this.element.removeEventListener(eventName, events[eventName as keyof typeof events])
    })
  }

  private _getChildren (propsAndChildren:object): { children:object, props:object } {
    const children:Indexed = {}
    const props:Indexed = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const isElementsInstanceBaseComponent = value.every(item => item instanceof BaseComponent)

        if (isElementsInstanceBaseComponent && value.length) {
          children[key] = value
        } else {
          props[key] = value
        }
      }

      if (value instanceof BaseComponent) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  public componentDidMount ():void {}

  public dispatchComponentDidMount (oldProps:Props):void {
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM, oldProps)
  }

  public componentDidUpdate (oldProps:Props, newProps:Props):boolean {
    if (!(oldProps && newProps)) return false

    return !isEqual(oldProps, newProps)
  }

  public setProps = (nextProps:Indexed):void => {
    if (!nextProps) {
      return;
    }

    this._removeEvents()

    Object.assign(this.props, nextProps);
  }

  public getContent ():HTMLElement {
    return this.element
  }

  public show ():void {
    this.getContent().style.display = 'block'
  }

  public hide ():void {
    this.getContent().style.display = 'none'
  }

  public render ():HTMLElement | void {}

  public compile (template:string, props:Props):DocumentFragment {
    const propsAndStubs:Indexed = { ...props }
    const compile = Handlebars.compile(template)

    Object.entries(this.children).forEach(([key, child]:[string, Array<BaseComponent> | BaseComponent]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.reduce((str, item) => str + `<div data-id="${item.id}"></div>`, '')
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    fragment.innerHTML = compile(propsAndStubs)

    Object.values(this.children).forEach((child:BaseComponent | Array<BaseComponent>) => {
      if (Array.isArray(child)) {
        child.forEach(item => {
          const stub = fragment.content.querySelector(`[data-id="${item.id}"]`) as HTMLTemplateElement
          stub.replaceWith(item.getContent())
        })
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`) as HTMLTemplateElement
        stub.replaceWith(child.getContent())
      }
    })

    return fragment.content
  }
}

export default BaseComponent
