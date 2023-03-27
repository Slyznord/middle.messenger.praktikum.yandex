import BaseComponent from '../../../../block/block'
import template from './message.tmpl'

export default class Message extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
