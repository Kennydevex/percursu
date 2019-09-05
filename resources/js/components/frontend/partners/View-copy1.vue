<template>
  <v-container grid-list-xl fluid class="primary">
    <v-layout row wrap>
      <v-flex xs2>
        <v-card class="mymenu" width="300">
          <v-card-text>
            <v-layout column wrap class="text-center align-center" mb-4>
              <v-flex xs12>
                <v-avatar size="150" color="red">
                  <img src="src" alt="alt" />
                </v-avatar>
              </v-flex>
              <v-flex xs12>
                <p>Nome</p>
                <h3>Idade</h3>
                <h2>Morada</h2>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout mb-4 column wrap class="text-center align-center">
              <v-flex xs12>
                <v-btn outlined color="success">Sobre</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn outlined color="success" block>Contactos</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn outlined color="success" block>Experiencias</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn outlined color="success" block>Formações</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn outlined color="success" block>Habilidades</v-btn>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap class="text-center align-center">
              <v-flex xs12>
                <v-icon>mdi-home</v-icon>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs10>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae facilis maxime ex labore maiores necessitatibus tenetur eaque eos 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import ViewPartner from "@back/percursu/partners/View";
import { getChargesDatas, getPartnersDatas } from "@mixins/HelpersData";

export default {
  mixins: [getPartnersDatas],
  data() {
    return {
      username: this.$route.params.username,
      partner: []
    };
  },

  created() {
    this.getSinglePartiner(this.username);
  },
  // components: {
  //   ViewPartner
  // },
  methods: {
    getSinglePartiner: function(username) {
      if (this.partners.length > 0) {
        this.partner = this.partners.find(
          partner => partner.folk.user.username == username
        );
      } else {
        axios
          .get("/api/v1/percursu/partners/" + username)
          .then(response => {
            this.partner = response.data.data;
          })
          .catch(error => {});
      }
    }
  }
};
</script>
