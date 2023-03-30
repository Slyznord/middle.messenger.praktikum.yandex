import BaseComponent from '../../block/block'
import template from './settings.tmpl'
import './settings.scss'

export default class Settings extends BaseComponent {
	constructor(props) {
		super('div', props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
