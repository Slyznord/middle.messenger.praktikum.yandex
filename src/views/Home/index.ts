// Views
import Home from './home'
import Settings from '../Settings'

// Components and modules
import Chat from '../../modules/chat/chat'
import ChatControl from '../../modules/chat/components/control/control'
import ChatDay from '../../modules/chat/components/day/day'
import ChatHeader from '../../modules/chat/components/header/header'
import ChatMessage from '../../modules/chat/components/message/message'
import Input from "../../components/input/input";
import Sidebar from '../../modules/sidebar/sidebar'
import SidebarDialog from "../../modules/sidebar/components/dialog/dialog";
import User from '../../modules/user/user'

// utils
import { render } from '../../utils/renderDOM'

export default new Home({
	wrapperClasses: 'flex flex-row gap-8 h-full w-full',
	chat: new Chat({
		control: new ChatControl({
			input: new Input({
				wrapperClasses: 'w-full',
				type: 'text',
				name: 'message',
				classes: 'w-full input input_message',
				placeholder: 'Сообщение...'
			})
		}),
		dialog: [
			new ChatDay({
				wrapperClasses: 'w-full',
				date: '4 февраля',
				messages: [
					new ChatMessage({
						classes: 'chat__message_sender',
						text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						time: '12:00'
					})
				]
			})
		],
		header: new ChatHeader({
			wrapperClasses: 'w-full',
			user: new User({
				wrapperClasses: 'user',
				avatarClasses: 'user__avatar_sm',
			})
		}),
		wrapperClasses: 'chat'
	}),
	sidebar: new Sidebar({
		dialogs: new Array(10).fill({}).map(item => {
			item = new SidebarDialog({
				wrapperClasses: 'dialog',
				name: 'Misha',
				message: 'message',
				time: '12:00',
				events: {
					click: () => {
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
})
