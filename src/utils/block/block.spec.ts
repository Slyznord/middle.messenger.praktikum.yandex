import BaseComponent from './block'
import { Indexed } from '../types'
import { expect } from 'chai'

const jsdom = require('jsdom')
const template = `{{ title }}`

class Component extends BaseComponent {
  constructor(tagName = 'div', props:Indexed) {
    super(tagName, props)
  }

  render () {
    return this.compile(template, this.props)
  }
}

before(() => {
  const dom = new jsdom.JSDOM(
    `<html><body><div id="app"></div></body></html>`,
    { url: 'http://localhost' }
  )

  global.window = dom.window
  global.document = dom.window.document
})

describe('Проверяем BaseComponent', () => {
  function createComponent ({ ...props }) {
    return new Component('div', { ...props })
  }

  it('Проверяем отрисовку компонента и его содержимого', () => {
    const component = createComponent({ wrapperClasses: 'wrapper', title: 'Hello world' })

    // @ts-ignore
    expect(component.element.innerHTML, 'Hello world')
  })
})
