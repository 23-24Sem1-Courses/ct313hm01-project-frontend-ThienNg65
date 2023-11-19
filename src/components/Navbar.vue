<template>
  <div class="header navbar-dark bg-dark w-auto h-50">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <h3>Apple Reseller</h3>
    </router-link>

    <nav class="navbar">
      <router-link :to="{ name: 'Home' }">Home </router-link>
      <router-link :to="{ name: 'SearchView' }">Shop</router-link>
      <router-link :to="{ name: 'WishList' }">Wishlist </router-link>
      <router-link :to="{ name: 'MyOrder' }">My Orders</router-link>
    </nav>

    <div class="icons">
      <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
      <router-link :to="{ name: 'Cart' }">
        <div class="fas fa-shopping-cart cart"></div>
      </router-link>

      <div v-if="!token" class="fas fa-user account">
        <ul class="drop-down-select">
          <li>
            <router-link :to="{ name: 'Signin' }">login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Signup' }">register</router-link>
          </li>
        </ul>
      </div>

      <div v-else class="fas fa-user account" style="background: #f38609; color: white">
        <ul class="drop-down-select">
          <!-- validate admin -->
          <li>
            <router-link :to="{ name: 'Admin' }">Admin</router-link>
          </li>
          <li>
            <router-link @click="signout" to="/">Sign out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  props: ['cartCount'],
  data() {
    return {
      searchTerm: '',
      showSearch: false,
      token: null
    };
  },
  methods: {
    showNav: function () {
      let navbar = document.querySelector('.header .navbar');
      navbar.classList.toggle('active');
    },

    signout() {
      localStorage.removeItem('token');
      this.token = null;
      swal({
        text: 'Logged you out. Visit again',
        icon: 'success'
      });
      this.$emit('resetCartCount');
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
  }
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 9%;
}

.header .logo {
  font-size: 2.5rem;
  font-weight: bolder;
  color: #130f40;
}

.header .logo img {
  padding-right: 0.5rem;
  color: #27ae60;
}

.header .navbar a {
  font-size: 1.5rem;
  margin: 0 1rem;
  color: #666;
}

.header .navbar a:hover {
  color: #27ae60;
}

.header .navbar a.router-link-exact-active {
  color: #f38609;
}

.header .icons div {
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  background: #f7f7f7;
  color: #130f40;
  border-radius: 0.5rem;
  margin-left: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.header .icons div:hover {
  color: #fff;
  background: #27ae60 !important;
}

.header .icons a.router-link-exact-active .cart {
  background: #f38609;
  color: white;
}

#menu-btn {
  display: none;
}

.header .icons .account .drop-down-select {
  display: none;
  position: absolute;
  margin-left: -65px;
  list-style-type: none;
}

.header .icons .account .drop-down-select a {
  text-decoration: none;
  color: #130f40;
  font-size: 15px;
  font-weight: 500;
  float: left;
  width: 95px;
  border-radius: 5%;
}

.header .icons .account .drop-down-select.active {
  display: block !important;
}

.header .icons .account .drop-down-select.active a {
  background-color: #f7f7f7;
}

.header .icons .account .drop-down-select.active a:hover {
  background-color: #f38609;
  color: white;
}

/* .header .icons .account:hover .drop-down-select {
    display: block;
} */

.header .icons .account:hover .drop-down-select a {
  background-color: #f7f7f7;
}

.header .icons .account:hover .drop-down-select a:hover {
  background-color: #f38609;
  color: white;
}

@media (min-width: 769px) {
  .header .icons .account:hover .drop-down-select {
    display: block;
  }
}

@media (max-width: 768px) {
  .header .navbar {
    position: absolute;
    top: 99%;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  .header .navbar.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .header .navbar a {
    font-size: 2rem;
    margin: 2rem;
    display: block;
  }

  #menu-btn {
    display: inline-block;
  }
}

@media (max-width: 576px) {
  .header .navbar a {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>
