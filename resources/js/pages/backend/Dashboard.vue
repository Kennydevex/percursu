<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
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
    </v-container>
  </div>
</template>

<script>
import MiniStatistic from "@widgets/statistic/MiniStatistic";

export default {
  components: {
    MiniStatistic
  },
  data: () => ({
    user: [
      {
        name: "Joao"
      }
    ],

    chartdata: {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [10, 40, 20, 50]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
};
</script>
