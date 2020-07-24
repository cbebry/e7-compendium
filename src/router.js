import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Search from './views/search'
import Mechanics from './views/mechanics'
import Guides from './views/guides'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /* Home */{
      path: '/',
      name: 'home',
      component: Home
    },
    /* Search */{
      path: '/search',
      name: 'search',
      component: Search
    },
    /* Mechanics */{
      path: '/mechanics',
      name: 'mechanics',
      component: Mechanics
    },
    /* Guides */{
      path: '/guides',
      name: 'guides',
      component: Guides
    },

    /* About */{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ]
})
