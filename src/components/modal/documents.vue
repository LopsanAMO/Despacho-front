<template>
  <div id="documents">
    <b-modal id="modalDocument"
             ref="modal"
             centered
             title="Crear Documento"
             hide-footer
             @shown="clearData">
      <b-alert variant="danger"
           dismissible
           :show="statusAlert"
           @dismissed="statusAlert=false">
           {{error}}
      </b-alert>
      <form @submit.stop.prevent="createDocument">
        <b-form-group>
          <b-form-input v-model="name" placeholder="Nombre del documento"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="createDocument">Crear documento</b-btn>
      <br>
    </b-modal>
    <b-modal id="modalUpdateDocument"
             ref="modal2"
             centered
             title="Modificar Documento"
             hide-footer
             @shown="clearData">
      <b-alert variant="danger"
           dismissible
           :show="statusAlert"
           @dismissed="statusAlert=false">
           {{error}}
      </b-alert>
      <form @submit.stop.prevent="updateDocument">
        <b-form-group>
          <p>Nombre del Documento</p>
          <b-form-input v-model="name" v-bind:value="documentData.name" placeholder="Nombre del documento"></b-form-input>
        </b-form-group>
      </form>
      <b-btn class="mt-3" variant="outline-info" block @click="updateDocument">Actualizar Documento</b-btn>
    </b-modal>
  </div>
</template>


<script>
  /*
    eslint no-console: "error",
    no-alert: "error"
  */
  export default {
    name: 'documents',
    data() {
      return {
        file: null,
        name: '',
        statusAlert: false,
        error: [],
      };
    },
    methods: {
      clearData() {
        this.name = '';
        this.file = null;
        this.statusAlert = false;
        this.error = [];
      },
      createDocument(evt) {
        evt.preventDefault();
        if (this.file && this.name) {
          const form = new FormData();
          form.append('document', this.file);
          form.append('name', this.name);
          form.append('folder', this.$store.getters.folderID);
          this.$store.dispatch('createDocument', form)
            .then(() => {
              this.$refs.modal.hide();
              this.$store.dispatch('getDocuments', this.$route.query.folder);
              this.$store.dispatch('getFolderInfo', this.$route.query.folder);
            })
            .catch((error) => {
              this.statusAlert = true;
              this.error = error.detail.non_field_errors[0];
            });
        } else {
          /*
            eslint-disable
          */
          alert('documento requerido y nombre de documento requeridos');
          /*
            eslint-enable
          */
        }
      },
      updateDocument(evt) {
        evt.preventDefault();
        this.$store.dispatch('updateDocument', { data: { name: this.name }, id: this.documentData.id })
          .then(() => {
            this.$refs.modal2.hide();
            this.$store.dispatch('getDocuments', this.$route.query.folder);
            this.$store.dispatch('getFolderInfo', this.$route.query.folder);
          })
          .catch((error) => {
            this.statusAlert = true;
            this.error = error.response.data.detail;
          });
      },
    },
    computed: {
      documentData() {
        return this.$store.getters.document_short_data_info;
      },
    },
  };
</script>