<template>
  <div class="product-view">
    <div class="heading text-center my-3">
      <h3>Our Products</h3>
    </div>
  </div>

  <div class="col-auto filters-wrapper flex gap-2 align-items-center d-flex flex-row mr-4 ml-5">
    <div class="form-control pt-3 pb-5 mr-3">
      <label for="search" class="label">
        <span class="label-text pr-2">Search</span>
      </label>
      <input
        id="search"
        type="text"
        v-model="filters.query"
        class="input input-bordered"
        style="width: 50%"
      />
    </div>

    <div class="form-control pt-3 pb-5 mr-3">
      <label for="filterCategory" class="label">
        <span class="label-text pr-2">Category</span>
      </label>
      <select id="filterCategory" class="select select-bordered" v-model="filters.category">
        <option value="">All</option>
        <option v-for="category in categories" :value="category.name" :key="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-control pt-3 pb-5 mr-3">
      <label for="orderBy" class="label">
        <span class="label-text pr-2">Order by</span>
      </label>

      <select id="orderBy" class="select select-bordered" v-model="filters.order">
        <option value="name">Name</option>
        <option value="price">Price Asc</option>
        <option value="-price">Price Dec</option>
      </select>
    </div>
  </div>

  <br />
  <!-- Display filtered products -->
  <div v-if="products.length > 0" class="product-list mr-5 ml-5 align-items-center">
    <div v-for="product in filteredProducts" :key="product.id" class="product-item pr-5">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <div class="product-info">
        <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }">
          <h4>{{ product.name }}</h4>
        </router-link>

        <p>{{ product.description }}</p>
        <p class="product-price">Price: ${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchView',

  data() {
    return {
      products: [],
      categories: [],
      filters: { query: '', category: '', order: '' },
      loading: true // Added loading state
    };
  },

  computed: {
    filteredProducts() {
      let filtered = this.products;

      // Filter by category
      if (this.filters.category) {
        filtered = filtered.filter((product) => product.category.name === this.filters.category);
      }

      // Search by query
      if (this.filters.query) {
        const query = this.filters.query.toLowerCase();
        filtered = filtered.filter((product) => product.name.toLowerCase().includes(query));
      }

      // Order by
      if (this.filters.order) {
        filtered = filtered.sort((a, b) => {
          const key = this.filters.order.replace('-', '');
          return a[key] > b[key] ? 1 : -1;
        });
      }

      return filtered;
    }
  },

  async created() {
    try {
      // Fetch products from the server
      const productsResponse = await axios.get('api/product/all');
      this.products = productsResponse.data;
      console.log('Products:', this.products);

      // Fetch categories from the server
      const categoriesResponse = await axios.get('/api/category/all');
      this.categories = categoriesResponse.data;
      console.log('Categories:', this.categories);

      // Data is loaded, set loading to false
      this.loading = false;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Set loading to false in case of an error
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.product-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters-wrapper {
  margin-top: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-item {
  height: 24rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.product-info {
  padding: 15px;
}

.product-price {
  font-weight: bold;
  color: #27ae60;
}
</style>
