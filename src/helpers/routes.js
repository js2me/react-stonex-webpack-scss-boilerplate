import _ from 'lodash'

const siteTitle = envs.title

export const routes = {
  services: {
    path: '/services',
    label: 'Win Services',
    component: () =>
      import(
        /* webpackChunkName: "services-page" */ '@pages/Services/container'
      ),
  },
  // login: {
  //   path: '/login',
  //   label: 'Login',
  //   component: () =>
  //     import(/* webpackChunkName: "login-page" */ '@pages/Login/container'),
  // },
}

export const getAllRoutesExceptFor = routeName =>
  _.values(_.omit(routes, routeName))

export const setPageTitle = (routeName, commonLabel) => {
  const title = document.getElementsByTagName('title')[0]
  const routeData = routes[routeName]
  title.innerText = `${siteTitle} | ${routeData.label +
    (commonLabel ? ` ${commonLabel}` : '')}`
}

const parsePath = path =>
  _(path)
    .split('/')
    .compact()

export const getFirstSubPath = path => parsePath(path).first()

export const getLastSubPath = path => parsePath(path).last()

export const changeRoute = routeName => history.go(routes[routeName].path)
