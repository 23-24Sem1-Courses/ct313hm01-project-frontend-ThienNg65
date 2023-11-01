
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import AddCategory from '../views/Category/AddCategory.vue';
import Category from '../views/Category/Category.vue';
import EditCategory from "../views/Category/EditCategory.vue"
import Product from '../views/Product/Product.vue';
import Admin from "../views/Admin.vue";
import AddProduct from "../views/Product/AddProduct.vue";

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
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category
  },

  // category edit
  {
    path: '/admin/category/:id',
    name: 'EditCategory',
    component: EditCategory
  },

  // admin home page
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/product',
    name: 'AdminProduct',
    component: Product
  },

  // add product
  {
    path: '/admin/product/new',
    name: 'AddProduct',
    component: AddProduct
  },



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