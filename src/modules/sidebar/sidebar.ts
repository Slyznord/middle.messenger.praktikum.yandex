import BaseComponent from '../../utils/block/block'
import template from './sidebar.tmpl'
import './sidebar.scss';

export default class Sidebar extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}
