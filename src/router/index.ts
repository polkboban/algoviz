import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SortingPage from '../views/SortingPage.vue'
import GraphPage from '../views/GraphPage.vue'
import PageReplacementPage from '../views/PageReplacementPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sorting',
      name: 'sorting',
      component: SortingPage
    },
    {
      path: '/graph',
      name: 'graph',
      component: GraphPage
    },
    {
      path: '/page-replacement',
      name: 'page-replacement',
      component: PageReplacementPage
    }
  ]
})

export default router