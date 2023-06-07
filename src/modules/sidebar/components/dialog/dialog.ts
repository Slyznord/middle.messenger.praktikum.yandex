import BaseComponent from '../../../../utils/block/block'
import template from './dialog.tmpl'
import './dialog.scss'

export default class Dialog extends BaseComponent {
  constructor(props:object) {
    super('article', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}