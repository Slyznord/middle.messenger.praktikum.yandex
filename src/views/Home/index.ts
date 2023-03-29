// Views
import Home from './home'
import Settings from '../Settings'

// Components and modules
import Chat from '../../modules/chat/chat'
import ChatControl from '../../modules/chat/components/control/control'
import ChatHeader from '../../modules/chat/components/header/header'
import Input from "../../components/input/input";
import Sidebar from '../../modules/sidebar/sidebar'
import SidebarDialog from "../../modules/sidebar/components/dialog/dialog";
import User from '../../modules/user/user'

// utils
import { render } from '../../utils/renderDOM'

const chat = new Chat({
	control: new ChatControl({
		input: new Input({
			wrapperClasses: 'w-full',
			type: 'text',
			name: 'message',
			classes: 'w-full input input_message',
			placeholder: 'Сообщение...'
		})
	}),
	dialogs: [],
	header: new ChatHeader({
		wrapperClasses: 'w-full',
		user: new User({
			wrapperClasses: 'user',
			avatarClasses: 'user__avatar_sm',
		})
	}),
	wrapperClasses: 'chat'
})
const sidebar = new Sidebar({
	dialogs: new Array(10).fill({}).map(item => {
		item = new SidebarDialog({
			wrapperClasses: 'dialog',
			name: 'Misha',
			message: 'message',
			time: '12:00',
			events: {
				click: () => {
					chat.setProps({
						dialogs: [
							{
								date: '4 февраля',
								messages: [
									{
										classes: 'chat__message_sender',
										text: 'test',
										time: '12:00'
									}
								]
							}
						]
					})
				}
			}
		})
		return item
	}),
	search: new Input({
		classes: 'search__input input_bg-secondary w-full',
		name: 'search',
		placeholder: 'Поиск',
		type: 'text',
		wrapperClasses: 'w-full'
	}),
	wrapperClasses: 'wrapper menu gap-10',
	user: new User({
		events: {
			click: () => {
				render('#app', Settings)
			}
		},
		wrapperClasses: 'user'
	})
})

export default new Home({
	wrapperClasses: 'flex flex-row gap-8 h-full w-full',
	chat,
	sidebar
})
