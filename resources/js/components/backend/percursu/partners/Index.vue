<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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