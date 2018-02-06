import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import articleList from '@/components/article/List'
import articleAdd from '@/components/article/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'article',
          name: 'article-list',
          components: {
            main: articleList
          }
        },
        {
          path: 'article/add',
          name: 'article-list-add',
          components: {
            main: articleAdd
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
