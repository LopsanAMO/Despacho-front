<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="whenCancelled"></loading>
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
          <template slot="id" slot-scope="data">
            <p style="cursor: pointer; color: green;" v-b-modal.modalUpdateFolder v-on:click="updateStateFolder(`${data.item.name}`, `${data.item.id}`)">Editar</p>
          </template>
          <template slot="user" slot-scope="data">
            <p style="cursor: pointer; color: red;" v-on:click="deleteFolder(`${data.item.slug}`, `${data.item.name}`)">Eliminar</p>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>


<script>
  import Loading from 'vue-loading-overlay';

  import 'vue-loading-overlay/dist/vue-loading.min.css';

  export default {
    name: 'users',
    mounted() {
      this.$store.dispatch('getFolders', this.$route.query.name);
      this.isLoading = true;
      this.$store.dispatch('getClient', this.$route.query.name)
        .then(() => {
          this.isLoading = false;
        });
    },
    components: {
      Loading,
    },
    data() {
      return {
        fields: [
          { key: 'name', label: 'Nombre' },
          { key: 'created', label: 'Creado' },
          { key: 'id', label: 'Editar' },
          { key: 'user', label: 'Eliminar' },
        ],
        isLoading: false,
      };
    },
    methods: {
      whenCancelled() {
        return true;
      },
      toDocuments(data) {
        this.$router.push({ name: 'folders', query: { folder: data }, params: { name: this.folderUser } });
      },
      deleteFolder(folderName, name) {
        /*
          eslint-disable
        */
        if (confirm(`Seguro que deseas eliminar el folder "${name}"`)) {
        /*
          eslint-enable
        */
          this.$store.dispatch('deleteFolder', folderName)
            .then(() => {
              this.$store.dispatch('getFolders', this.$route.query.name);
              this.isLoading = true;
              this.$store.dispatch('getClient', this.$route.query.name)
                .then(() => {
                  this.isLoading = false;
                });
            })
            .catch((error) => {
              /*
                eslint-disable
              */
              alert(error.response.data.detail);
              /*
                eslint-enable
              */
            });
        } else {
          /*
            eslint-disable
          */
          console.log('cancel');
          /*
            eslint-enable
          */
        }
      },
      updateStateFolder(name, id) {
        this.$store.commit('folderShortInfo', { folder_name: name, folder_id: id });
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