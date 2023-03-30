import BaseComponent from '../../block/block'
import template from './home.tmpl'

export default class Home extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}
