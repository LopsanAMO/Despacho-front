<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">Buscador</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="isLoggedIn == false">
              <a class="nav-link" v-b-modal.modalLogin>Inicia sesión</a>
            </li>
            <li class="nav-item" v-else>
              <a class="nav-link" style="cursor: pointer;" v-on:click="logout">Cerrar sesión</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn == true">
              <a class="nav-link" style="cursor: pointer;" v-b-modal.modalClient>Agregar Nuevo Cliente</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    <modal-login/>
    <modal-client/>
    <modal-folder/>
    <modal-document/>
    <main style="margin-top: 25px !important;">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import login from '@/components/auth/login';
import client from '@/components/modal/client';
import folder from '@/components/modal/folder';
import documents from '@/components/modal/documents';

export default {
  name: 'app',
  components: {
    'modal-login': login,
    'modal-client': client,
    'modal-folder': folder,
    'modal-document': documents,
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.go();
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
