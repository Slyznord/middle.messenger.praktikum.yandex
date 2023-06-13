import Router from './router'
import Text from '../../../components/text/text'
import {Indexed, route} from '../../types'
import { expect } from 'chai'
import Route from '../route/route'

const jsdom = require('jsdom')

before(() => {
  const dom = new jsdom.JSDOM(
    `<html><body><div id="app"></div></body></html>`,
    { url: 'http://localhost' }
  )

  global.window = dom.window
  global.document = dom.window.document
})

describe('Проверяем работу роутера', () => {
  const routes = [
    {
      path: '/',
      component: Text
    },
    {
      path: '/login',
      component: Text
    },
    {
      path: '/messenger',
      component: Text
    }
  ]

  function getRouter () {
    const router = new Router('#app', (routes as unknown as route[]))
    router.start()

    return router
  }

  it('Проверяем кол-во роутов после инициализации роутера', () => {
    const router = getRouter()
    expect(router.routes.length).eq(routes.length)
  })

  it('Проверяем работу метода use', () => {
    const router = getRouter()

    router.use('/auth', (Text as unknown as Indexed))
    expect(router.routes.length).eq(routes.length + 1)
  })

  it('Проверяем работу метода go', () => {
    const router = getRouter()
    router.go('/login')

    expect((router.currentRoute as unknown as Route).pathname, '/login')
  })

  it('Провереемя работу метода back', () => {
    const router = getRouter()

    router.go('/messenger')
    router.back()

    setTimeout(() => {
      expect(router.currentRoute?.pathname, '/login')
    }, 1000)
  })

  it('Проверяем работу метода forward', () => {
    const router = getRouter()

    router.go('/messenger')
    router.back()
    router.forward()

    setTimeout(() => {
      expect(router.currentRoute?.pathname, '/messenger')
    }, 1000)
  })
})
