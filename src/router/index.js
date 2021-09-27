import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Staking from '../views/Dividends.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/land/:landId/dao',
    name: 'Home',
    component: Home,
  },
  {
    path: '/land/:landId/staking',
    name: 'Staking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Dividends.vue')
    component: Staking
  },
  {
    path: '/land/:landId/',
    name: 'Home',
    component: Home,
    redirect: '/land/:landId/dao'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/land/1/dao'
  },
]

const router = new VueRouter({
  // for github pages
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
