<template>
  <div class="index">
    <div v-if="isLogin == false">
      <h1><a  v-b-modal.modalLogin href="#">Inicia Sesion</a></h1> 
    </div>
    <div v-else>
      <div class="container">
        <b-container fluid responsive>
          <b-row>
            <b-col md="8" class="my-1">
              <b-form-group horizontal label="Filtro por nombre" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" :input="filterClient()" placeholder="Escribe para buscar" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" v-on:click="resetFilter()">Borrar busqueda</b-btn>
                    <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="whenCancelled"></loading>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-table hover responsive :items="clientData" :fields="fields">
          <template slot="name" slot-scope="data">
            <p style="cursor: pointer;" v-on:click="toUser(''+data.item.url)">{{data.item.name}}</p>
          </template>
          <template slot="url" slot-scope="data">
            <p style="cursor: pointer; color: red;" v-on:click="deleteUser(`${data.item.slug}`, `${data.item.name}`)">Eliminar</p>
          </template>
          <template slot="id" slot-scope="data">
            <p style="cursor: pointer; color: green;" v-b-modal.modalUpdateClient v-on:click="updateStateClient(`${data.item.name}`, `${data.item.id}`)">Editar</p>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1" responsive>
              <b-pagination :total-rows="totalRows" :per-page="perPage" :click="paginationNumber()" v-model="currentPage" class="my-0" />
            </b-col>
        </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
  name: 'index',
  data() {
    return {
      fields: [
        { key: 'name', label: 'Nombre' },
        { key: 'id', label: 'Editar' },
        { key: 'url', label: 'Eliminar' },
      ],
      totalRows: this.numberClient,
      perPage: 10,
      currentPage: 1,
      processing: false,
      processingFilter: false,
      processingResetFilder: false,
      currentPageAux: 1,
      filter: '',
      filterAux: '',
      isLoading: false,
      name: '',
    };
  },
  components: {
    Loading,
  },
  methods: {
    whenCancelled() {
      return true;
    },
    toUser(data) {
      this.$router.push({ name: 'users', query: { name: data } });
    },
    paginationNumber() {
      if (this.processing === true && this.currentPage === this.currentPageAux) {
        return;
      }
      this.processing = true;
      this.isLoading = true;
      this.$store.dispatch('getClients', `?page=${this.currentPage}`)
        .then(() => {
          this.isLoading = false;
        });
      // loader.hide();
      this.currentPageAux = this.currentPage;
    },
    resetFilter() {
      if (this.processingResetFilder === true && this.filter !== '') {
        return;
      }
      this.processing = true;
      this.isLoading = true;
      this.$store.dispatch('getClients', '')
        .then(() => {
          this.isLoading = false;
        });
      this.currentPageAux = this.currentPage;
      this.filter = '';
      this.filterAux = '';
    },
    updateStateClient(name, id) {
      this.$store.commit('clientShortInfo', { client_name: name, client_id: id });
    },
    deleteUser(clientName, name) {
      /*
        eslint-disable
      */
      if (confirm(`Seguro que deseas eliminar al cliente "${name}"`)) {
      /*
        eslint-enable
      */
        this.$store.dispatch('deleteClient', clientName)
          .then(() => {
            this.isLoading = true;
            this.$store.dispatch('getClients', '')
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
    filterClient() {
      if (this.processingFilter === true && this.filter === this.filterAux) {
        return;
      }
      this.processingFilter = true;
      this.$store.dispatch('getClientByNamePart', this.filter);
      this.filterAux = this.filter;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated;
    },
    clientData() {
      return this.$store.getters.clients;
    },
    numberClient() {
      return this.$store.getters.clientsNumber;
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
