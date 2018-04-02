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
        /*
          eslint-disable
        */
        /*
          eslint-enable
        */
        if (this.name) {
          const formData = {
            name: this.name,
          };
          this.$store.dispatch('createFolder', { name: formData.name, user: this.$store.getters.clientID })
            .then(() => {
              this.$refs.modal.hide();
              this.$router.go();
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
    },
  };
</script>