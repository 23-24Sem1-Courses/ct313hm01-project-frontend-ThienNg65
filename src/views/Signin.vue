<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin" class="flext-item border">
          <h2 class="pt-4 pl-4">Sign-In</h2>
          <form @submit="signin" class="form-group pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email </label>
              <input v-model="email" type="email" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password </label>
              <input v-model="password" type="password" class="form-control" />
            </div>
            <button class="btn btn-primary mt-2 py-0">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authService from '../services/auth.service';
import swal from 'sweetalert';
export default {
  props: [],
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      const credentials = {
        email: this.email,
        password: this.password
      };
      await authService
        .login(credentials)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          swal({
            text: 'Login successful',
            icon: 'success'
          });
          this.$emit('fetchData');
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => console.log('err', err));
    }
  }
};
</script>
<style scoped>
input {
  width: 100%;
}
.btn-primary {
  background-color: #f0c14b;
  color: black;
}

@media screen and (min-width: 992px) {
  #signin {
    width: 40%;
  }
}
</style>
