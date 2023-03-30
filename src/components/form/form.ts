import BaseComponent from '../../block/block'
import template from './form.tmpl'
import { props } from './types'
import './form.scss'

export default class Form extends BaseComponent {
	constructor(props:props) {
		super('div', props)
	}

	render():DocumentFragment {
		return this.compile(template, this.props)
	}
}
