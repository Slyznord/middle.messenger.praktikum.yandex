import BaseComponent from '../../../../block/block'
import template from './header.tmpl'
import './header.scss'

export default class Header extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}