<template>
  <div id="folder">
    <b-modal id="modalFolder"
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
      <form @submit.stop.prevent="createFolder">
        <b-form-group>
          <b-form-input v-model="name" placeholder="Nombre del folder"></b-form-input>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="createFolder">Crear folder</b-btn>
      <br>
    </b-modal>
    <b-modal id="modalUpdateFolder"
             ref="modal2"
             centered
             title="Actualizar folder"
             hide-footer
             @shown="clearData">
      <b-alert variant="danger"
               dismissible
               :show="statusAlert"
               @dismissed="statusAlert=false">
        {{error}}
      </b-alert>
      <form @submit.stop.prevent="updateFolder">
        <b-form-group>
          <p>Nombre del folder</p>
          <b-form-input v-model="name" v-bind:value="folderData.name" placeholder="Nombre del folder"></b-form-input>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="updateFolder">Actualizar folder</b-btn>
    </b-modal>
  </div>
</template>


<script>
  /*
    eslint no-console: "error",
    no-alert: "error"
  */
  export default {
    name: 'folder',
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
      createFolder(evt) {
        evt.preventDefault();
        if (this.name) {
          const formData = {
            name: this.name,
          };
          this.$store.dispatch('createFolder', { name: formData.name, user: this.$store.getters.clientID })
            .then(() => {
              this.$refs.modal.hide();
              this.$store.dispatch('getFolders', this.$route.query.name);
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
      updateFolder(evt) {
        evt.preventDefault();
        this.$store.dispatch('updateFolder', { data: { name: this.name }, id: this.folderData.id })
          .then(() => {
            this.$refs.modal2.hide();
            this.isLoading = true;
            this.$store.dispatch('getFolders', this.$route.query.name);
            this.isLoading = true;
            this.$store.dispatch('getClient', this.$route.query.name)
              .then(() => {
                this.isLoading = false;
              })
              .catch((error) => {
                this.statusAlert = true;
                this.error = error.response.data.detail;
              });
          });
      },
    },
    computed: {
      folderData() {
        return this.$store.getters.folder_short_data_info;
      },
    },
  };
</script>