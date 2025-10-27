import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import DashboardView from '@/views/DashboardView.vue';
import TicketsView from '@/views/TicketsView.vue';
import { useAuth } from '@/stores/auth';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth/Login', component: Login },
  { path: '/auth/SignUp', component: SignUp },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    component: TicketsView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth();

  if (to.meta.requiresAuth) {
    if (checkAuth()) {
      next();
    } else {
      next('/auth/Login');
    }
  } else {
    next();
  }
});

export default router;
