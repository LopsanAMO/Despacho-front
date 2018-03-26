<template>
  <div class="login">
    <!-- Modal Login -->
    <b-modal id="modalLogin"
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
      <form @submit.stop.prevent="handleLogin">
        <b-form-group>
          <b-form-input v-model="email" placeholder="Direccion de correo electronico"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="password" :type="type" placeholder="Contraseña"></b-form-input>
        </b-form-group>
      </form>
      <b-container class="bv-example-row">
        <b-row>
          <b-form-checkbox id="checkbox1"
                           value="accepted"
                           unchecked-value="not_accepted">
                           <!-- v-model="status" -->
            Recordarme
          </b-form-checkbox>
          <b-col></b-col>
          <b-link href @click="showPass">{{show_pass_text}}</b-link>
        </b-row>
      </b-container>
      <b-container class="bv-example-row">
        <b-row class="text-center">
          <b-col></b-col>
          <b-col cols="8">
            <b-link href="#foo">
              ¿Olvidaste tu contaseña?
            </b-link>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
      <b-btn class="mt-3" variant="outline-info" block @click="handleLogin"> Inicia sesión</b-btn>
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
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        username: '',
        token: '',
        show_pass_text: 'Mostrar Contraseña',
        type: 'password',
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true,
        },
        statusAlert: false,
        error: [],
      };
    },
    methods: {
      showPass() {
        if (this.type === 'text') {
          this.type = 'password';
          this.show_pass_text = 'Mostrar contraseña';
        } else {
          this.type = 'text';
          this.show_pass_text = 'Ocultar contraseña';
        }
      },
      clearData() {
        this.email = '';
        this.password = '';
        this.type = 'password';
        this.token = '';
        this.statusAlert = false;
        this.error = [];
      },
      handleLogin(evt) {
        const that = this;
        evt.preventDefault();
        if (this.email && this.password) {
          const formData = {
            email: that.email,
            password: that.password,
          };
          this.$store.dispatch('login', { email: formData.email, password: formData.password })
            .then(() => {
              this.$refs.modal.hide();
              this.$router.go();
            })
            .catch((error) => {
              this.statusAlert = true;
              this.error = error.response.data.non_field_errors[0];
            });
        } else {
          /*
            eslint-disable
          */
          alert('email and password required for this action');
          /*
            eslint-enable
          */
        }
      },
    },
  };
</script>

<style>
  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }
</style>
