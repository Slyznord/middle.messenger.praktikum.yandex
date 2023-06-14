import BaseComponent from '../../../../utils/block/block'
import template from './dialog.tmpl'
import './dialog.scss'
import { Indexed } from '../../../../utils/types'

export default class Dialog extends BaseComponent {
  constructor(props:Indexed) {
    super('article', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}
