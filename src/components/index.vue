<template>
  <div class="hello">
    <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <div class="container">
        <b-table hover responsive :items="clientData" :fields="fields">
          <template slot="name" slot-scope="data">
            <p style="cursor: pointer;" v-on:click="toUser(''+data.item.url)">{{data.item.name}}</p>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      fields: [
        { key: 'name', label: 'Nombre' },
      ],
    };
  },
  created() {
    this.$store.dispatch('getClients');
  },
  methods: {
    toUser(data) {
      this.$router.push({ name: 'users', query: { name: data } });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated;
    },
    clientData() {
      return this.$store.getters.clients;
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
