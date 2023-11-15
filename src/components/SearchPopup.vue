<template>
  <div class="search-popup">
    <h1>Search</h1>
    <select v-model="selectedCategory">
      <option value="all">All</option>
      <option value="clothing">Clothing</option>
      <option value="electronics">Electronics</option>
    </select>
    <input type="text" v-model="searchTerm" placeholder="Search..." />
    <button type="submit">Search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchPopup',
  data() {
    return {
      selectedCategory: 'all',
      searchTerm: ''
    };
  },
  methods: {
    onSubmit() {
      // Submit the search query to the backend
    }
  }
};
</script>
