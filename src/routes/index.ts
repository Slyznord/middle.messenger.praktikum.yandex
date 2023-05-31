import Auth from '../views/Auth/auth'
import Home from '../views/Home/home'
import Registration from '../views/Registration/registration'
import Settings from '../views/Settings/settings'

export const routes = [
	{
		path: '/',
		component: Auth
	},
	{
		path: '/sign-up',
		component: Registration
	},
	{
		path: '/messenger',
		component: Home
	},
	{
		path: '/settings',
		component: Settings
	}
]