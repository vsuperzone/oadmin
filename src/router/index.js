import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import articleList from '@/components/article/List'
import articleAdd from '@/components/article/Add'
import articleEdit from '@/components/article/Edit'
import user from '@/components/User'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'article',
          name: 'article-list',
          meta: {
            requireAuth: true
          },
          components: {
            main: articleList
          }
        },
        {
          path: 'article/page/:page',
          name: 'article-page',
          meta: {
            requireAuth: true
          },
          components: {
            main: articleList
          }
        },
        {
          path: 'article/add',
          name: 'article-add',
          meta: {
            requireAuth: true
          },
          components: {
            main: articleAdd
          }
        },
        {
          path: 'article/:id',
          name: 'article-edit',
          meta: {
            requireAuth: true
          },
          components: {
            main: articleEdit
          }
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            requireAuth: true
          },
          components: {
            main: user
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

var accessToken = window.localStorage.getItem('accessToken')
Vue.prototype.accessToken = accessToken

// if (window.localStorage.getItem('token')) {
//   store.dispatch('login', window.localStorage.getItem('token'))
// }

router.beforeEach((to, from, next) => {
  // 登录后禁止访问
  if (to.meta.cannotlogin) {
    if (accessToken) {
      next('/')
    }
  }
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (accessToken) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
