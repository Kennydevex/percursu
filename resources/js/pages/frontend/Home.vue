<template>
  <div>
    <app-slider />

    <app-missions />

    <app-parralax />
    <app-featured />

    <app-map />
    <template v-if="authUser">
      <v-btn
        :to="{name: 'editar-colobaradores', params: {username: authUser.username}}"
        color="primary"
        dark
        medium
        fixed
        bottom
        right
        fab
        class="mb-5"
        v-if="authUser.folk.partner"
      >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>

      <v-btn
        :to="{name: 'criar-colobaradores'}"
        color="primary"
        dark
        medium
        fixed
        bottom
        right
        fab
        class="mb-5"
        v-if="!authUser.folk.partner"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn :to="{name: 'login'}" color="primary" dark medium fixed bottom right fab class="mb-5">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </template>
  </div>
</template>
<script>
import AppSlider from "@pfront/AppSlider";
import AppParralax from "@pfront/AppParralax";
import AppFeatured from "@pfront/AppFeatured";
import AppMissions from "@pfront/AppMissions";
import AppMap from "@pfront/AppMap";
export default {
  data() {
    return {
      fab: false
    };
  },

  components: {
    AppSlider,
    AppMissions,
    AppMap,
    AppParralax,
    AppFeatured
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: fixed;
  z-index: 100;
}

#create .v-btn--floating {
  position: relative;
}
</style>