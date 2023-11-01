
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import AddCategory from '../views/Category/AddCategory.vue';
import Category from '../views/Category/Category.vue';
import EditCategory from "../views/Category/EditCategory.vue"
import Product from '../views/Product/Product.vue';
import Admin from "../views/Admin.vue";
import AddProduct from "../views/Product/AddProduct.vue";
import EditProduct from "../views/Product/EditProduct.vue";
import ShowDetails from "../views/Product/ShowDetails.vue";
import ListProducts from "../views/Category/ListProducts.vue";
import Signup from "../views/Signup.vue";
import Signin from '../views/Signin.vue';

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

  // category detail page
  {
    path: '/category/show/:id',
    name: 'ListProducts',
    component: ListProducts
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

  // edit product
  {
    path: '/admin/product/:id',
    name: 'EditProduct',
    component: EditProduct
  },

  // Product detail
  {
    path: '/admin/product/:id',
    name: 'ShowDetails',
    component: ShowDetails
  },


  // sign up and signin

  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
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