import BaseComponent from '../../block/block'
import template from './text.tmpl'
import { props } from './types'

export default class Text extends BaseComponent {
	constructor(props:props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
