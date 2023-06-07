import Router from './utils/router/router/router'
import { routes } from './routes'

export const router = new Router('#app', routes)

router.start()