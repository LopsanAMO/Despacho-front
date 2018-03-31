<template>
  <div>
    <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <div class="container">
        <b-table hover responsive :items="folderDara" :fields="fields">
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
    created() {
      this.$store.dispatch('getFolders', this.$route.query.name);
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
        /*
          eslint-disable
        */
        alert(data);
        /*
          eslint-enable
        */
      },
    },
    computed: {
      isLogin() {
        return this.$store.getters.isAuthenticated;
      },
      folderDara() {
        return this.$store.getters.folders;
      },
    },
  };
</script>