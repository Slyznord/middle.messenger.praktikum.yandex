import EventBus from '../utils/event-bus'
import { v4 } from 'uuid'
import * as Handlebars from 'handlebars'

class BaseComponent {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:components-did-mount',
    FLOW_CDU: 'flow:components-did-update',
    FLOW_RENDER: 'flow:render'
  }

  private element:HTMLElement
  protected children
  private readonly meta:{ tagName:string, props:object }
  private readonly id:string

  public props:ProxyHandler<object>
  private eventBus:Function

  constructor(tagName:string = 'div', propsAndChildren:object = { settings: {} }) {
    // @ts-ignore
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

  private registerEvents (eventBus):void {
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
    // @ts-ignore
    const { wrapperClasses = null } = this.props

    if (wrapperClasses) {
      wrapperClasses.split(' ').forEach(item => { this.element.classList.add(item) })
    }
  }

  private _createDocumentElement (tagName:string):HTMLElement {
    const element = document.createElement(tagName)

    // @ts-ignore
    if (this.props.settings?.withInternalID) {
      element.setAttribute('data-id', this.id)
    }

    return element
  }

  private _makePropsProxy (props:object):ProxyHandler<object> {
    const self = this

    return new Proxy(props, {
      set (target, prop:string, value) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Отказано в доступе')
        }

        const oldProps = JSON.parse(JSON.stringify(target))

        if (target[prop] !== value) {
          target[prop] = value;
          self.eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, oldProps, target)
          return true
        }

        return false
      }
    })
  }

  private _render ():void {
    const block = this.render()

    this.element.innerHTML = ''
    this.element.appendChild(block)

    this._addParentClass()
    this._addEvents()

    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM)
  }

  private _componentDidMount ():void {
    this.componentDidMount();
  }

  private _componentDidUpdate (oldProps, newProps):void {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this._render()
    }
  }

  private _addEvents ():void {
    // @ts-ignore
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      const element = this.element.querySelector(`[${eventName}]`) || this.element
      element.addEventListener(eventName, events[eventName])
    })
  }

  private _removeEvents ():void {
    // @ts-ignore
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this.element.removeEventListener(eventName, events[eventName])
    })
  }

  private _getChildren (propsAndChildren):object {
    const children:object = {}
    const props:object = {}

    // @ts-ignore
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

  public dispatchComponentDidMount (oldProps):void {
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM, oldProps)
  }

  public componentDidUpdate (oldProps, newProps):boolean {
    return true;
  }

  public setProps = (nextProps):void => {
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

  public render ():any {}

  public compile (template, props):DocumentFragment {
    const propsAndStubs = { ...props }
    const compile = Handlebars.compile(template)

    // @ts-ignore
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.reduce((str, item) => str + `<div data-id="${item.id}"></div>`, '')
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template')
    fragment.innerHTML = compile(propsAndStubs)

    // @ts-ignore
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(item => {
          // @ts-ignore
          const stub = fragment.content.querySelector(`[data-id="${item.id}"]`)
          stub.replaceWith(item.getContent())
        })
      } else {
        // @ts-ignore
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
        stub.replaceWith(child.getContent())
      }
    })

    // @ts-ignore
    return fragment.content
  }
}

export default BaseComponent
