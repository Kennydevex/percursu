<template>
  <v-footer app absolute padless>
    <v-card-text flat tile width="100%" class="pa-0 text-center">
      <v-card-text class="cyan darken-4 white--text">
        <v-btn dark v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-text class="blue-grey darken-3 white--text">
        <v-container grid-list-xl>
          <v-layout row wrap justify-space-around align-start fill-height>
            <v-flex xs12 md4>
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Subscrição</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-card elevation-4>
                        <v-card-text>
                          <v-text-field
                            filled
                            outlined
                            shaped
                            name="name"
                            label="Introduza o seu correio eletrónico"
                            id="id"
                            hint="Subscreva para receber notificações em primeira mão"
                            persistent-hint
                            append-outer-icon="mdi-send"
                            @click:append-outer="test"
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12>
                      <v-subheader class="grey--text text--lighten-2 justify-center">Autenticação</v-subheader>
                      <v-btn small fab text color="grey lighten-3">
                        <v-icon>mdi-login</v-icon>
                      </v-btn>
                      <v-btn small fab text color="grey lighten-3">
                        <v-icon>mdi-google</v-icon>
                      </v-btn>
                      <v-btn small fab text color="grey lighten-3">
                        <v-icon>mdi-linkedin</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
            </v-flex>
            <v-flex xs12 md4>
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Subscrição</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-layout row wrap>
                    <v-flex xs12>
                      Teste
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
            </v-flex>
            <v-flex xs12 md4>
              <v-card-text color="transparent" tile flat>
                <v-card-title
                  class="justify-center grey--text text--lighten-3"
                  primary-title
                >Conexão</v-card-title>
                <v-divider dark></v-divider>
                <v-card-text class="px-0 grey--text text--lighten-3">
                  <v-layout row wrap>
                    <v-flex xs12>
                      teste
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-text class="blue-grey darken-4 white--text">
        {{ new Date().getFullYear() }} —
        <strong>Percursu</strong>
      </v-card-text>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-account-tie", "mdi-briefcase"]
  }),
  methods: {
    test() {
      console.log("teste de tese");
    }
  }
};
</script>