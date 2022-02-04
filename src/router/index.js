import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import { projectAuth } from '../firebase/config'

// Auth guard
const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser

  if (!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: () => import('../views/Chatroom.vue'),
    // This function will run before the route is loaded
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
