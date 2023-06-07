import BaseComponent from '../../../../utils/block/block'
import template from './header.tmpl'
import './header.scss'

export default class Header extends BaseComponent {
	constructor(props:object) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
