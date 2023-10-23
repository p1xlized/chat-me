import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import getAuth
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path:'/register',
    name:'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LogInView.vue')
  },
  {
    path: '/Profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/feed',
    name:'feed',
    component: () => import(/* webpackChunkName: "feed" */ '../views/FeedView.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const getCurrentUser = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener();
      resolve(user);
    })
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      // User is authenticated, allow navigation
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // If the route does not require authentication, allow navigation
    next();
  }
});

export default router;
