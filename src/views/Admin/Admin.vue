<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="adminPanel container">
    <router-link :to="{ name: 'Product' }">
      <button type="button" class="btn btn-primary btn-lg">Admin Products</button>
    </router-link>
    <router-link :to="{ name: 'Category' }">
      <button type="button" class="btn btn-primary btn-lg">Admin Categories</button>
    </router-link>
    <router-link :to="{ name: 'OrderBox' }">
      <button type="button" class="btn btn-primary btn-lg">Admin Orders</button>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
    }
  }
};
</script>

<style scoped>
.adminPanel {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.adminPanel button {
  font-size: 30px;
  width: fit-content;
}
</style>
