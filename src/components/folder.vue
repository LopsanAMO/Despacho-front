<template>
  <div id="folder">
  <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="whenCancelled"></loading>
  <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <b-container class="bv-example-row">
          <b-row>
              <b-col cols="2">
                <p style="cursor: pointer;" v-on:click.stop.prevent="back()">Atras</p>
              </b-col>
              <b-col cols="6">
              </b-col>
              <b-col cols="3">
                <p class="nav-link" style="cursor: pointer;" v-b-modal.modalDocument>Agregar nuevo documento</p>
              </b-col>
          </b-row>
      </b-container>
      <div class="container">
        <b-table hover responsive :items="documentData" :fields="fields">
          <template slot="name" slot-scope="data">
            <p>{{data.item.name}}</p>
          </template>
          <template slot="created" slot-scope="raw">
            {{raw.value | formatDate}}
          </template>
          <template slot="folder" slot-scope="data">
            <a :href="'https://despacho-cloud.s3.amazonaws.com/'+data.item.document" target="_blank">Ver</a>
          </template>
          <template slot="id" slot-scope="data">
            <p style="cursor: pointer; color: green;" v-b-modal.modalUpdateDocument v-on:click="updateStateDocument(`${data.item.id}`, `${data.item.name}`)">Editar</p>
          </template>
          <template slot="slug" slot-scope="data">
            <p style="cursor: pointer; color: red;" v-on:click="deleteDocument(`${data.item.slug}`)">Eliminar</p>
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
    name: 'folder',
    mounted() {
      this.isLoading = true;
      this.$store.dispatch('getDocuments', this.$route.query.folder)
        .then(() => {
          this.isLoading = false;
        });
      this.$store.dispatch('getFolderInfo', this.$route.query.folder);
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
          { key: 'folder', label: 'Ver' },
          { key: 'slug', label: 'Eliminar' },
        ],
        name: this.$route.params.name,
        statusAlert: true,
        isLoading: false,
      };
    },
    methods: {
      back() {
        this.$router.go('-1');
      },
      deleteDocument(name) {
        this.$store.dispatch('deleteDocument', name)
          .then(() => {
            this.isLoading = true;
            this.$store.dispatch('getDocuments', this.$route.query.folder)
              .then(() => {
                this.isLoading = false;
              });
          })
          .catch(() => {
            /*
              eslint-disable
            */
            alert('No se pudo eliminar el archivo');
            /*
              eslint-enable
            */
          });
      },
      updateStateDocument(id, name) {
        this.$store.commit('documentShortInfo', { doc_name: name, doc_id: id });
      },
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