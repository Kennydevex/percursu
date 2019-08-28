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
            <v-flex xs12 sm6 md3>
              <v-card flat tile color="transparent" class="grey--text text--lighten-3">
                <v-card-title
                  class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase"
                  primary-title
                >Subscrição</v-card-title>
                <v-card-text>
                  <div class="text-md-left text-sm-center">
                    <v-text-field
                      box
                      name="name"
                      label="Subscreva para notificações"
                      id="id"
                      color="white"
                      append-icon="mdi-send-circle"
                      @click:append="test"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-subheader class="grey--text text--lighten-2">Autenticação</v-subheader>
                    <v-btn small fab flat color="grey lighten-3"><v-icon>mdi-login</v-icon></v-btn>
                    <v-btn small fab flat color="grey lighten-3"><v-icon>mdi-google</v-icon></v-btn>
                    <v-btn small fab flat color="grey lighten-3"><v-icon>mdi-linkedin</v-icon></v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title
                  class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase"
                  primary-title
                >Categprias de Colaboradores</v-card-title>
                <v-card-text>
                  <div class="text-xs-center">
                   <v-list class="transparent">
                     <v-list-tile @click="" class="grey--text">
                       <v-list-tile-title class="text-xs-center text--grey">Categoria 1</v-list-tile-title>
                     </v-list-tile>
                     <v-list-tile @click="" class="grey--text">
                       <v-list-tile-title class="text-xs-center text--grey">Categoria 2</v-list-tile-title>
                     </v-list-tile>
                     <v-list-tile @click="" class="grey--text">
                       <v-list-tile-title class="text-xs-center text--grey">Categoria 3</v-list-tile-title>
                     </v-list-tile>
                   </v-list>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title
                  class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase"
                  primary-title
                >Subscrição</v-card-title>
                <v-card-text>
                  <div
                    class="text-xs-center"
                  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et est facere nihil? Hic, atque. Velit maiores facere excepturi dolore tempore possimus necessitatibus eaque consequatur saepe doloribus ipsa, quam quos.</div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-card class="grey--text text--lighten-3" flat tile color="transparent">
                <v-card-title
                  class="teal--text text--lighten-3 justify-center title font-weight-light text-uppercase"
                  primary-title
                >Ligações</v-card-title>
                <v-card-text class="text-center align-center text-justify justify-center">
                  <div
                    class="text-md-right text-sm-center"
                  >
                  <ul type="none">
                    <li><router-link class="grey--text text--lighten-3" to="">Empresa 1</router-link></li>
                    <li><router-link to="">Empresa 1</router-link></li>
                    <li><router-link to="">Empresa 1</router-link></li>
                    <li><router-link to="">Empresa 1</router-link></li>
                    <li><router-link to="">Empresa 1</router-link></li>
                    <li><router-link to="">Empresa 1</router-link></li>
                  </ul>
                 
                  </div>
                </v-card-text>
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
  }),
  methods: {
    test() {
      console.log("teste de tese");
    }
  }
};
</script>