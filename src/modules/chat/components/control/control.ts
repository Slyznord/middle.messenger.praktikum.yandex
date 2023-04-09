import BaseComponent from '../../../../utils/block/block'
import template from './control.tmpl'

export default class Control extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
