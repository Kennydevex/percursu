<template>
  <div>
    <section>
      <app-slider />
    </section>

    <section>
      <app-missions />
    </section>

    <section>
      <app-formados />
    </section>
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        bottom="bottom"
        right="right"
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon>mdi-account</v-icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green">
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
  </div>
</template>
<script>
import AppSlider from "@pfront/AppSlider";
import AppMissions from "@pfront/AppMissions";
import AppFormados from "@pfront/AppFormados";
export default {
  data() {
    return {
      fab: false
    };
  },

  components: {
    AppSlider,
    AppMissions,
    AppFormados
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