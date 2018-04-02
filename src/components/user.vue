<template>
  <div>
    <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <b-container class="bv-example-row">
          <b-row>
              <b-col cols="2">
                <a href="/">Atras</a>
              </b-col>
              <b-col cols="6">
              </b-col>
              <b-col cols="3">
                <p class="nav-link" style="cursor: pointer;" v-b-modal.modalFolder>Agregar nuevo folder</p>
              </b-col>
          </b-row>
      </b-container>
      <div class="container">
        <b-table hover responsive :items="folderData" :fields="fields">
          <template slot="name" slot-scope="data">
            <p style="cursor: pointer;" v-on:click="toDocuments(''+data.item.slug)">{{data.item.name}}</p>
          </template>
          <template slot="created" slot-scope="raw">
            {{raw.value | formatDate}}
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'users',
    mounted() {
      this.$store.dispatch('getFolders', this.$route.query.name);
      this.$store.dispatch('getClient', this.$route.query.name);
    },
    data() {
      return {
        fields: [
          { key: 'name', label: 'Nombre' },
          { key: 'created', label: 'Creado' },
        ],
      };
    },
    methods: {
      toDocuments(data) {
        this.$router.push({ name: 'folders', query: { folder: data }, params: { name: this.folderUser } });
      },
    },
    computed: {
      isLogin() {
        return this.$store.getters.isAuthenticated;
      },
      folderData() {
        return this.$store.getters.folders;
      },
      folderUser() {
        return this.$store.getters.folderUser;
      },
    },
  };
</script>