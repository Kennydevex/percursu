<template>
  <div>
    listra
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        bottom="bottom"
        right="right"
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="primary" dark fab>
            <v-icon>mdi-briefcase-account</v-icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <v-btn :to="{name: 'create-partner'}" fab small color="teal lighten-1">
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
export default {
  data() {
    return {
      fab: false
    };
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