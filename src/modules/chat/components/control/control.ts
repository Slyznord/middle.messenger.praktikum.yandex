import BaseComponent from '../../../../utils/block/block'
import template from './control.tmpl'
import { Indexed } from '../../../../utils/types'

export default class Control extends BaseComponent {
	constructor(props:Indexed) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
