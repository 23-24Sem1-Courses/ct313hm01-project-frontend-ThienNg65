
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import AddCategory from '../views/Category/AddCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/AddCategory',
    name: 'AddCategory',
    component: AddCategory
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;