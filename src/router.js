import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Projects from './pages/Projects.vue';
import FromH from './pages/FromH.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/fromh', component: FromH },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});

export default router;
