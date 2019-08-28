<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-multiple-check"
          :title="user.length"
          sub-title="Utilizadores"
          color="indigo"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-file-multiple"
          :title="user.length"
          sub-title="Publicações"
          color="red"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-facebook"
          title="200+"
          sub-title="Seguidores"
          color="indigo darken-3"
        ></mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-linkedin"
          title="50+"
          sub-title="Seguidores"
          color="blue darken-3"
        ></mini-statistic>
      </v-flex>
      <!-- mini statistic  end -->
    </v-layout>

    <v-layout row wrap>
      <v-card id="users-action">
        <v-speed-dial
          v-model="fab"
          bottom="bottom"
          right="right"
          direction="top"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green" :to="{name: 'create-post'}">
            <v-icon>mdi-file-document-box-plus</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MiniStatistic from "@widgets/statistic/MiniStatistic";

export default {
  data() {
    return {
      fab: false,
      user: []
    };
  },

  components: {
    MiniStatistic
  }
};
</script>

<style lang="stylus" scoped>
#users-action .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 35px;
}

#users-action .v-btn--floating {
  position: relative;
}
</style>