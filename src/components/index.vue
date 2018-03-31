<template>
  <div class="hello">
    <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <div class="container">
        <b-table hover responsive :items="documentData">
          <template slot="folder" slot-scope="row">
            <p v-for="eq in row.value" :key="eq.name">
              {{eq.name}}
            </p>
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
      documents: null,
    };
  },
  created() {
    this.$store.dispatch('getAllClients');
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated;
    },
    documentData() {
      return this.$store.getters.documents;
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
