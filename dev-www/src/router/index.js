import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Addbook from '@/components/Addbook'
import Cardmanage from '@/components/Cardmanage'
import Borrowandret from '@/components/Borrowandret'
import LoginForm from '@/components/LoginForm'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/addbook',
      name: 'Addbook',
      component: Addbook
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/borrow',
      name: 'Borrowandret',
      component: Borrowandret
    },
    {
      path: '/cardmanage',
      name: 'Cradmanage',
      component: Cardmanage
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    }
  ]
})
