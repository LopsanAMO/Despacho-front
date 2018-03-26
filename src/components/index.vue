<template>
  <div class="hello">
    <h1 v-if="isLogin == false"><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    <h1 v-else><a href="#">Hola</a></h1> 
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
