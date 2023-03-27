import BaseComponent from '../../../../block/block'
import template from './day.tmpl'

export default class Day extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
