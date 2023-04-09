import BaseComponent from '../../utils/block/block'
import template from './container.tmpl'
import './container.scss'

export default class Container extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
