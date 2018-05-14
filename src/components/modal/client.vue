<template>
  <div class="client">
    <b-modal id="modalClient"
             ref="modal"
             centered
             title="Inicia sesión para continuar"
             hide-footer
             @shown="clearData">
     <b-alert variant="danger"
           dismissible
           :show="statusAlert"
           @dismissed="statusAlert=false">
        {{error}}
      </b-alert>
      <form @submit.stop.prevent="createClient">
        <b-form-group>
          <b-form-input v-model="name" placeholder="Nombre del cliente"></b-form-input>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="createClient">Crear Cliente</b-btn>
      <br>
    </b-modal>
    <b-modal id="modalUpdateClient"
             ref="modal2"
             centered
             title="Actualizar Cliente"
             hide-footer
             @shown="clearData">
      <b-alert variant="danger"
               dismissible
               :show="statusAlert"
               @dismissed="statusAlert=false">
        {{error}}
      </b-alert>
      <form @submit.stop.prevent="updateClient">
        <b-form-group>
          <p>Nombre de Cliente</p>
          <b-form-input v-model="name" v-bind:value="clientData.name" placeholder="Nombre del cliente"></b-form-input>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="updateClient">Actualizar Cliente</b-btn>
    </b-modal>
  </div>
</template>

<script>
  /*
    eslint no-console: "error",
    no-alert: "error"
  */
  export default {
    name: 'client',
    data() {
      return {
        name: '',
        statusAlert: false,
        error: [],
        isLoading: false,
      };
    },
    methods: {
      clearData() {
        this.name = '';
        this.statusAlert = false;
        this.error = [];
      },
      createClient(evt) {
        evt.preventDefault();
        if (this.name) {
          const formData = {
            name: this.name,
          };
          this.$store.dispatch('createClients', { name: formData.name })
            .then(() => {
              this.$refs.modal.hide();
              this.$store.dispatch('getClients', '');
            })
            .catch((error) => {
              this.statusAlert = true;
              this.error = error.detail.non_field_errors[0];
            });
        } else {
          /*
            eslint-disable
          */
          alert('nombre de cliente requerido');
          /*
            eslint-enable
          */
        }
      },
      updateClient(evt) {
        evt.preventDefault();
        this.$store.dispatch('updateClientData', { data: { name: this.name }, id: this.clientData.id })
          .then(() => {
            this.$refs.modal2.hide();
            this.isLoading = true;
            this.$store.dispatch('getClients', '?page=1')
              .then(() => {
                this.isLoading = false;
              });
            this.$forceUpdate();
          })
          .catch((error) => {
            this.statusAlert = true;
            this.error = error.response.data.detail;
          });
      },
    },
    computed: {
      clientData() {
        return this.$store.getters.client_short_data_info;
      },
    },
  };
</script>