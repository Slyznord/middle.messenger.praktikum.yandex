import BaseComponent from '../../block/block'
import template from './registration.tmpl'

export default class Registration extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
