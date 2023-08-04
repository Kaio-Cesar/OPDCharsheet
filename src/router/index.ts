import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from "../supabase";

// Views:
import HomeView from '../views/HomeView.vue'


// -----------
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        needAuthentication: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const {data: session} = await supabase.auth.getSession()
  if (to.meta.needAuthentication && !session.session) {
    return {name: 'auth'}
  }
})

export default router
