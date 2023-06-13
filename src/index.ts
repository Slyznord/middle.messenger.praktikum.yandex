import Router from './utils/router/router/router'
import { routes } from './routes'
import './styles/main.scss'

export const router = new Router('#app', routes)

router.start()
