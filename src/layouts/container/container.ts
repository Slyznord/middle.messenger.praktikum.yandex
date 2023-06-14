import BaseComponent from '../../utils/block/block'
import template from './container.tmpl'
import './container.scss'
import { Indexed } from "../../utils/types";

export default class Container extends BaseComponent {
	constructor(props:Indexed) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
