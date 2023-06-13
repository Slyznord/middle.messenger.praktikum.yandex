import Auth from '../views/Auth/auth'
import Home from '../views/Home/home'
import Registration from '../views/Registration/registration'
import Settings from '../views/Settings/settings'
import { Indexed, route } from '../utils/types'

export const routes:route[] = [
	{
		path: '/',
		component: (Auth as unknown as Indexed<unknown>)
	},
	{
		path: '/sign-up',
		component: Registration as unknown as Indexed<unknown>
	},
	{
		path: '/messenger',
		component: Home as unknown as Indexed<unknown>
	},
	{
		path: '/settings',
		component: Settings as unknown as Indexed<unknown>
	}
]
