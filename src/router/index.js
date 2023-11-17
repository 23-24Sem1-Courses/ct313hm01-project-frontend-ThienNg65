
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/HomeView.vue';

import AddCategory from '../views/Category/AddCategory.vue';
import Category from '../views/Category/Category.vue';
import EditCategory from "../views/Category/EditCategory.vue"
import Product from '../views/Product/Product.vue';
import Admin from '../views/Admin/Admin.vue'
import AddProduct from "../views/Product/AddProduct.vue";
import EditProduct from "../views/Product/EditProduct.vue";
import ShowDetails from "../views/Product/ShowDetails.vue";
import ListProducts from "../views/Category/ListProducts.vue";
import Signup from "../views/Signup.vue";
import Signin from '../views/Signin.vue';
import WishList from '../views/Product/WishList.vue';
import Cart from '../views/Cart.vue'

import Success from '../views/payment/Success.vue';
import Failed from '../views/payment/Failed.vue'

import Checkout from '../views/Checkout/Checkout.vue'

import SearchView from '../views/Search/SearchView.vue'

import MyOrder from '../views/Orders/MyOrder.vue'
import OrderDetails from '../views/Orders/OrderDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
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
    name: 'Product',
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
    path: '/admin/product/detail/:id',
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
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: WishList,
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  // success and fail page
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: Success,
  },
  {
    path: '/payment/failed',
    name: 'PaymentFail',
    component: Failed,
  },
  // checkout

  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },


  // ORDER
  {
    path: '/order',
    name: 'MyOrder',
    component: MyOrder,
  },
  {
    path: '/order/:id',
    name: 'OrderDetails',
    component: OrderDetails,
  },

]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  routes,
});

export default router;