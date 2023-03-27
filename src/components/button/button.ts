import BaseComponent from '../../block/block'
import template from './button.tmpl'
import './button.scss'
import { props } from './types'

export default class Button extends BaseComponent {
  constructor(tagName:string = 'div', props:props) {
    super(tagName, props);
  }

  render () {
    return this.compile(template, this.props)
  }
}
