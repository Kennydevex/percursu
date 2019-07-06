<template>
  <v-footer height="auto">
    <v-card flat tile class="flex">
      <v-card-text class="flex teal darken-3 white--text text-xs-center">
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="blue-grey darken-3 white--text">
        <v-container grid-list-xs fluid>
          <v-layout row wrap>
            <v-flex xs3>
              <v-card flat tile color="transparent" class="grey--text text--lighten-3">
                <v-card-title class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase" primary-title>Subscrição</v-card-title>
                <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et est facere nihil? Hic, atque. Velit maiores facere excepturi dolore tempore possimus necessitatibus eaque consequatur saepe doloribus ipsa, quam quos.</v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase" primary-title>Categprias de Colaboradores</v-card-title>
                <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et est facere nihil? Hic, atque. Velit maiores facere excepturi dolore tempore possimus necessitatibus eaque consequatur saepe doloribus ipsa, quam quos.</v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase" primary-title>Subscrição</v-card-title>
                <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et est facere nihil? Hic, atque. Velit maiores facere excepturi dolore tempore possimus necessitatibus eaque consequatur saepe doloribus ipsa, quam quos.</v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase" primary-title>Subscrição</v-card-title>
                <v-card-text class=" text-center align-center text-justify justify-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et est facere nihil? Hic, atque. Velit maiores facere excepturi dolore tempore possimus necessitatibus eaque consequatur saepe doloribus ipsa, quam quos.</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions class="blue-grey darken-4 grey--text justify-center">
        &copy;2019 —
        <strong>By Estefânio Silva</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-google",
      "mdi-linkedin",
      "mdi-instagram"
    ],
    rows: [
      {
        title: "Company Name",
        children: [
          "Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit"
        ]
      },
      {
        title: "Products",
        children: [
          "MDBootstrap",
          "MDWordPress",
          "BrandFlow",
          "Bootstrap Angular"
        ]
      },
      {
        title: "Useful Links",
        children: [
          "Your account",
          "Become an Affiliate",
          "Shipping Rates",
          "Helper"
        ]
      }
    ]
  })
};
</script>