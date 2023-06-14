import BaseComponent from '../../../../utils/block/block'
import template from './header.tmpl'
import './header.scss'
import { Indexed } from '../../../../utils/types'

export default class Header extends BaseComponent {
	constructor(props:Indexed) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
