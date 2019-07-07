<template>
  <div>
    <app-navbar app></app-navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer app></app-footer>
  </div>
</template>
<script>
import AppFooter from "./partials/Footer";
import AppNavbar from "./partials/Navbar";
export default {
  components: {
    AppNavbar,
    AppFooter
  }
};
</script>