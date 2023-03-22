import BaseComponent from '../../block/block'
import template from './button.tmpl'
import './button.scss'

export default class Button extends BaseComponent {
  constructor(props) {
    super('div', props);
  }

  render () {
    // @ts-ignore
    return this.compile(template, this.props)
  }
}