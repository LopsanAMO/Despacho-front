<template>
  <div id="folder">
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
            <a :href="'http://localhost:8000/media/'+data.item.document" target="_blank">Ver</a>
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
  export default {
    name: 'folder',
    mounted() {
      this.$store.dispatch('getDocuments', this.$route.query.folder);
      this.$store.dispatch('getFolderInfo', this.$route.query.folder);
    },
    data() {
      return {
        fields: [
          { key: 'name', label: 'Nombre' },
          { key: 'created', label: 'Creado' },
          { key: 'folder', label: 'Ver' },
          { key: 'slug', label: 'Eliminar' },
        ],
        name: this.$route.params.name,
      };
    },
    methods: {
      back() {
        this.$router.go('-1');
      },
      deleteDocument(name) {
        this.$store.dispatch('deleteDocument', name)
          .then(() => {
            this.$router.go();
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